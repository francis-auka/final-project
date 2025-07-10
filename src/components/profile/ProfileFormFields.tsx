
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileData {
  name: string;
  email: string;
  age: string;
  phone: string;
  school: string;
  course: string;
  year: string;
  sex: string;
}

interface ProfileFormFieldsProps {
  userData: ProfileData;
  setUserData: (data: ProfileData) => void;
  errors?: Record<string, string>;
}

export const ProfileFormFields = ({ userData, setUserData, errors = {} }: ProfileFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input 
          id="name" 
          value={userData.name} 
          onChange={(e) => setUserData({...userData, name: e.target.value.trim()})}
          required
          maxLength={100}
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          value={userData.email} 
          readOnly 
          className="bg-muted"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input 
          id="age" 
          type="number"
          min="13"
          max="100"
          value={userData.age} 
          onChange={(e) => setUserData({...userData, age: e.target.value})}
          className={errors.age ? "border-red-500" : ""}
        />
        {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          type="tel"
          value={userData.phone} 
          onChange={(e) => setUserData({...userData, phone: e.target.value.trim()})}
          maxLength={20}
          className={errors.phone ? "border-red-500" : ""}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="school">School/University</Label>
        <Input 
          id="school" 
          value={userData.school} 
          onChange={(e) => setUserData({...userData, school: e.target.value.trim()})}
          maxLength={200}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="course">Course/Major</Label>
        <Input 
          id="course" 
          value={userData.course} 
          onChange={(e) => setUserData({...userData, course: e.target.value.trim()})}
          maxLength={200}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="year">Year of Study</Label>
        <Select 
          value={userData.year} 
          onValueChange={(value) => setUserData({...userData, year: value})}
        >
          <SelectTrigger id="year">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">First Year</SelectItem>
            <SelectItem value="2">Second Year</SelectItem>
            <SelectItem value="3">Third Year</SelectItem>
            <SelectItem value="4">Fourth Year</SelectItem>
            <SelectItem value="5">Fifth Year</SelectItem>
            <SelectItem value="6">Graduate</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sex">Gender</Label>
        <Select 
          value={userData.sex} 
          onValueChange={(value) => setUserData({...userData, sex: value})}
        >
          <SelectTrigger id="sex">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
