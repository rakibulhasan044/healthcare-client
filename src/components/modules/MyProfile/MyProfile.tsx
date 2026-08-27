"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FadeUp, ScaleIn } from "@/components/shared/Animations";

interface IMyProfileProps {
  userInfo: UserInfo;
}
const MyProfile = ({ userInfo }: IMyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getProfilePhoto = () => {
    if (userInfo.role === "ADMIN") {
      return userInfo.admin?.profilePhoto;
    } else if (userInfo.role === "DOCTOR") {
      return userInfo.doctor?.profilePhoto;
    } else if (userInfo.role === "PATIENT") {
      return userInfo.patient?.profilePhoto;
    }
    return null;
  };

  const getProfileData = () => {
    if (userInfo.role === "ADMIN") {
      return userInfo.admin;
    } else if (userInfo.role === "DOCTOR") {
      return userInfo.doctor;
    } else if (userInfo.role === "PATIENT") {
      return userInfo.patient;
    }
    return null;
  };

  const profilePhoto = getProfilePhoto();
  const profileData = getProfileData();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          // Check if file is > 1MB
          if (file.size > 1024 * 1024) {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const newFile = new File([blob], file.name, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  });
                  setResizedFile(newFile);
                  setPreviewImage(URL.createObjectURL(blob));
                }
              },
              "image/jpeg",
              0.8
            );
          } else {
            setResizedFile(file);
            setPreviewImage(reader.result as string);
          }
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    
    // Override file with resized version if available
    if (resizedFile) {
      formData.set("file", resizedFile);
    }

    startTransition(async () => {
      const result = await updateMyProfile(formData);

      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <FadeUp className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <ScaleIn className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    {previewImage || profilePhoto ? (
                      <AvatarImage
                        src={previewImage || (profilePhoto as string)}
                        alt={userInfo.name}
                      />
                    ) : (
                      <AvatarFallback className="text-3xl">
                        {getInitials(userInfo.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label
                    htmlFor="file"
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <Input
                      type="file"
                      id="file"
                      name="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={isPending}
                    />
                  </label>
                </div>

                <div className="text-center">
                  <p className="font-semibold text-lg">{userInfo.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {userInfo.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 capitalize">
                    {userInfo.role.replace("_", " ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScaleIn>
          {/* Profile Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Common Fields for All Roles */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={profileData?.name || userInfo.name}
                    required
                    disabled={isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    defaultValue={profileData?.contactNumber || ""}
                    required
                    disabled={isPending}
                  />
                </div>
                {/* Doctor-Specific Fields */}
                {userInfo.role === "DOCTOR" && userInfo.doctor && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        defaultValue={userInfo.doctor.address || ""}
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">
                        Registration Number
                      </Label>
                      <Input
                        id="registrationNumber"
                        name="registrationNumber"
                        defaultValue={userInfo.doctor.registrationNumber || ""}
                        required
                        disabled={isPending}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience (Years)</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        defaultValue={userInfo.doctor.experience || ""}
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentFee">Appointment Fee</Label>
                      <Input
                        id="appointmentFee"
                        name="appointmentFee"
                        type="number"
                        defaultValue={userInfo.doctor.appointmentFee || ""}
                        required
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input
                        id="qualification"
                        name="qualification"
                        defaultValue={userInfo.doctor.qualification || ""}
                        required
                        disabled={isPending}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentWorkingPlace">
                        Current Working Place
                      </Label>
                      <Input
                        id="currentWorkingPlace"
                        name="currentWorkingPlace"
                        defaultValue={userInfo.doctor.currentWorkingPlace || ""}
                        required
                        disabled={isPending}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input
                        id="designation"
                        name="designation"
                        defaultValue={userInfo.doctor.designation || ""}
                        required
                        disabled={isPending}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        name="gender"
                        defaultValue={userInfo.doctor.gender || "MALE"}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isPending}
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Patient-Specific Fields */}
                {userInfo.role === "PATIENT" && userInfo.patient && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      defaultValue={userInfo.patient.address || ""}
                      disabled={isPending}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </FadeUp>
  );
};

export default MyProfile;
