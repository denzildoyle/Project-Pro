import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  status: string;
  photo: string;
}

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
}

export const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  isOpen,
  onClose,
  onAddPlayer,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    status: "Pending",
    photo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const positions = [
    "Forward",
    "Midfielder", 
    "Defender",
    "Goalkeeper"
  ];

  const statuses = [
    "Pending",
    "Completed"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum < 10 || ageNum > 25) {
        newErrors.age = "Age must be between 10 and 25";
      }
    }

    if (!formData.position) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newPlayer = {
      name: formData.name.trim(),
      age: parseInt(formData.age),
      position: formData.position,
      status: formData.status,
      photo: formData.photo || "/depth-10--frame-0.png", // Default photo
    };

    onAddPlayer(newPlayer);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      age: "",
      position: "",
      status: "Pending",
      photo: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-['Manrope',Helvetica] font-bold text-xl text-[#111416]">
            Add New Player
          </DialogTitle>
          <DialogDescription className="font-['Manrope',Helvetica] text-[#607589]">
            Enter the player's information below. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-['Manrope',Helvetica] font-medium text-[#111416]">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter player's full name"
              className={`font-['Manrope',Helvetica] ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 font-['Manrope',Helvetica]">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="font-['Manrope',Helvetica] font-medium text-[#111416]">
              Age *
            </Label>
            <Input
              id="age"
              type="number"
              min="10"
              max="25"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              placeholder="Enter age"
              className={`font-['Manrope',Helvetica] ${errors.age ? 'border-red-500' : ''}`}
            />
            {errors.age && (
              <p className="text-sm text-red-500 font-['Manrope',Helvetica]">{errors.age}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="position" className="font-['Manrope',Helvetica] font-medium text-[#111416]">
              Position *
            </Label>
            <Select value={formData.position} onValueChange={(value) => handleInputChange("position", value)}>
              <SelectTrigger className={`font-['Manrope',Helvetica] ${errors.position ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position} className="font-['Manrope',Helvetica]">
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.position && (
              <p className="text-sm text-red-500 font-['Manrope',Helvetica]">{errors.position}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="font-['Manrope',Helvetica] font-medium text-[#111416]">
              Assessment Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className="font-['Manrope',Helvetica]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status} className="font-['Manrope',Helvetica]">
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo" className="font-['Manrope',Helvetica] font-medium text-[#111416]">
              Photo URL (Optional)
            </Label>
            <Input
              id="photo"
              type="url"
              value={formData.photo}
              onChange={(e) => handleInputChange("photo", e.target.value)}
              placeholder="Enter photo URL or leave blank for default"
              className="font-['Manrope',Helvetica]"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="font-['Manrope',Helvetica] font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-['Manrope',Helvetica] font-medium bg-[#111416] hover:bg-[#2a2d31] text-white"
            >
              Add Player
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};