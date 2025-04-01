"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Loader2, User, Lock, Bell } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email_notifications: true,
    employee_updates: true,
    company_updates: true,
    security_alerts: true,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [id.replace("profile-", "")]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [id.replace("password-", "")]: value,
    }))
  }

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleProfileSubmit}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and contact details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-first_name">First Name</Label>
                    <Input id="profile-first_name" value={profileForm.first_name} onChange={handleProfileChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-last_name">Last Name</Label>
                    <Input id="profile-last_name" value={profileForm.last_name} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input id="profile-email" type="email" value={profileForm.email} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-phone">Phone Number</Label>
                  <Input id="profile-phone" value={profileForm.phone} onChange={handleProfileChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <form onSubmit={handlePasswordSubmit}>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to maintain account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password-current_password">Current Password</Label>
                  <Input
                    id="password-current_password"
                    type="password"
                    value={passwordForm.current_password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-new_password">New Password</Label>
                  <Input
                    id="password-new_password"
                    type="password"
                    value={passwordForm.new_password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-confirm_password">Confirm New Password</Label>
                  <Input
                    id="password-confirm_password"
                    type="password"
                    value={passwordForm.confirm_password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <form onSubmit={handleNotificationSubmit}>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications and alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email_notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email_notifications"
                    checked={notificationSettings.email_notifications}
                    onCheckedChange={(checked) => handleNotificationChange("email_notifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="employee_updates">Employee Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about employee changes</p>
                  </div>
                  <Switch
                    id="employee_updates"
                    checked={notificationSettings.employee_updates}
                    onCheckedChange={(checked) => handleNotificationChange("employee_updates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="company_updates">Company Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about company changes</p>
                  </div>
                  <Switch
                    id="company_updates"
                    checked={notificationSettings.company_updates}
                    onCheckedChange={(checked) => handleNotificationChange("company_updates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="security_alerts">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive security-related notifications</p>
                  </div>
                  <Switch
                    id="security_alerts"
                    checked={notificationSettings.security_alerts}
                    onCheckedChange={(checked) => handleNotificationChange("security_alerts", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

