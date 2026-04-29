import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockCars, Car } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useAdminCars, useCreateCar, useUpdateCar, useDeleteCar } from '@/hooks/useAdminCars';
import { useAdminRentals } from '@/hooks/useAdminRentals';

const AdminCars: React.FC = () => {
  const { data: cars = [], isLoading: isCarsLoading } = useAdminCars();
  const { data: rentals = [], isLoading: isRentalsLoading } = useAdminRentals();
  const isLoading = isCarsLoading || isRentalsLoading;
  const createCarMutation = useCreateCar();
  const updateCarMutation = useUpdateCar();
  const deleteCarMutation = useDeleteCar();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<any | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 0,
    fuelType: 'Petrol',
    seats: 5,
    transmission: 'Automatic',
    available: true,
    description: '',
    features: '', // Changed to string for easier editing in textarea (comma separated)
    mileage: '',
    engineCapacity: '',
  });

  const filteredCars = cars.filter((car: any) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      pricePerDay: 0,
      fuelType: 'Petrol',
      seats: 5,
      transmission: 'Automatic',
      available: true,
      description: '',
      features: '',
      mileage: '',
      engineCapacity: '',
    });
    setImageFiles([]);
    setExistingImages([]);
    setEditingCar(null);
  };

  const handleEdit = (car: any) => {
    setEditingCar(car);
    setFormData({
      ...car,
      features: car.features.join(', '),
    });
    setExistingImages(car.images || []);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (carId: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await deleteCarMutation.mutateAsync(carId);
        toast({
          title: "Car Deleted",
          description: "The car has been removed from the fleet.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete car.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (existingImages.length + imageFiles.length === 0) {
      toast({ title: "Error", description: "Please upload at least 1 image.", variant: "destructive" });
      return;
    }
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'features') {
        const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f !== '');
        data.append(key, JSON.stringify(featuresArray));
      } else {
        data.append(key, (formData as any)[key]);
      }
    });

    imageFiles.forEach(file => {
      data.append('images', file);
    });

    if (editingCar) {
      data.append('existingImages', JSON.stringify(existingImages));
    }

    try {
      if (editingCar) {
        await updateCarMutation.mutateAsync({ id: editingCar._id, formData: data });
        toast({
          title: "Car Updated",
          description: "The car details have been updated.",
        });
      } else {
        await createCarMutation.mutateAsync(data);
        toast({
          title: "Car Added",
          description: "The new car has been added to the fleet.",
        });
      }
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save car details.",
        variant: "destructive",
      });
    }
  };

  const handleImageRemove = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setImageFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalImages = existingImages.length + imageFiles.length + newFiles.length;
      if (totalImages > 4) {
        toast({ title: "Error", description: "Maximum 4 images allowed.", variant: "destructive" });
        const allowedCount = 4 - (existingImages.length + imageFiles.length);
        setImageFiles(prev => [...prev, ...newFiles.slice(0, allowedCount)]);
      } else {
        setImageFiles(prev => [...prev, ...newFiles]);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Car Management</h1>
          <p className="text-muted-foreground">Manage your fleet of vehicles</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button variant="gold" className="gap-2">
              <Plus className="h-5 w-5" />
              Add New Car
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                {editingCar ? 'Edit Car' : 'Add New Car'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Car Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Mercedes S-Class"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g., Mercedes-Benz"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., S 500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price Per Day ($)</Label>
                  <Input
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fuel Type</Label>
                  <Select
                    value={formData.fuelType}
                    onValueChange={(value: Car['fuelType']) => setFormData({ ...formData, fuelType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Seats</Label>
                  <Input
                    type="number"
                    value={formData.seats}
                    onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Transmission</Label>
                  <Select
                    value={formData.transmission}
                    onValueChange={(value: Car['transmission']) => setFormData({ ...formData, transmission: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Mileage</Label>
                  <Input
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="e.g., 8.5 km/l"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Engine Capacity</Label>
                  <Input
                    value={formData.engineCapacity}
                    onChange={(e) => setFormData({ ...formData, engineCapacity: e.target.value })}
                    placeholder="e.g., 3.0L V6"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Features (comma separated)</Label>
                  <Input
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="e.g., Leather Seats, Panoramic Roof, Massage Seats"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Car Images (Min 1, Max 4)</Label>
                <div className="flex gap-4 overflow-x-auto py-2">
                  {existingImages.map((imgUrl, idx) => (
                    <div key={`existing-${idx}`} className="relative w-24 h-24 flex-shrink-0 rounded-md border border-border overflow-hidden group">
                      <img src={imgUrl} alt="car thumbnail" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => handleImageRemove(idx, true)} className="absolute top-1 right-1 bg-black/50 hover:bg-black p-1 rounded-full text-white transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {imageFiles.map((file, idx) => (
                    <div key={`new-${idx}`} className="relative w-24 h-24 flex-shrink-0 rounded-md border border-border overflow-hidden group">
                      <img src={URL.createObjectURL(file)} alt="new car thumbnail" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => handleImageRemove(idx, false)} className="absolute top-1 right-1 bg-black/50 hover:bg-black p-1 rounded-full text-white transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  {(existingImages.length + imageFiles.length) < 4 && (
                    <Label htmlFor="image-upload" className="w-24 h-24 flex-shrink-0 rounded-md border-2 border-dashed border-muted-foreground/50 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
                      <Plus className="h-6 w-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageAdd}
                      />
                    </Label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the vehicle..."
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="available" className="cursor-pointer">Available for rent</Label>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" className="flex-1" onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button type="submit" variant="gold" className="flex-1" disabled={createCarMutation.isPending || updateCarMutation.isPending}>
                  {createCarMutation.isPending || updateCarMutation.isPending ? 'Saving...' : (editingCar ? 'Update Car' : 'Add Car')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search cars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12"
        />
      </div>

      {/* Cars Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Car</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Brand</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Price/Day</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                   <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">Loading cars...</td>
                </tr>
              ) : filteredCars.length === 0 ? (
                 <tr>
                   <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">No cars found.</td>
                 </tr>
              ) : filteredCars.map((car: any) => (
                <tr key={car._id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={car.images[0] || 'https://via.placeholder.com/150'}
                          alt={car.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{car.name}</p>
                        <p className="text-sm text-muted-foreground">{car.model} • {car.year}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground">{car.brand}</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-primary">${car.pricePerDay}</span>
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const isRented = rentals.some((r: any) => r.car?._id === car._id && r.status === 'active');
                      if (car.available) {
                        return <Badge variant="success">Available</Badge>;
                      } else if (isRented) {
                        return <Badge variant="destructive">Rented</Badge>;
                      } else {
                        return <Badge variant="secondary">Unavailable</Badge>;
                      }
                    })()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(car)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(car._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCars;
