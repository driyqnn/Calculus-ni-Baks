import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { CourseData, createDefaultCourse } from '@/utils/storage';

interface CourseSelectorProps {
  courses: CourseData[];
  activeCourseId: string | null;
  onCourseSelect: (courseId: string) => void;
  onCourseCreate: (course: CourseData) => void;
  onCourseDelete: (courseId: string) => void;
  onCourseUpdate: (course: CourseData) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  activeCourseId,
  onCourseSelect,
  onCourseCreate,
  onCourseDelete,
  onCourseUpdate,
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);

  const handleCreateCourse = () => {
    if (newCourseName.trim()) {
      const newCourse = createDefaultCourse(newCourseName.trim());
      onCourseCreate(newCourse);
      setNewCourseName('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleEditCourse = () => {
    if (editingCourse && newCourseName.trim()) {
      const updatedCourse = { ...editingCourse, name: newCourseName.trim() };
      onCourseUpdate(updatedCourse);
      setEditingCourse(null);
      setNewCourseName('');
      setIsEditDialogOpen(false);
    }
  };

  const startEditCourse = (course: CourseData) => {
    setEditingCourse(course);
    setNewCourseName(course.name);
    setIsEditDialogOpen(true);
  };

  const activeCourse = courses.find(c => c.id === activeCourseId);

  return (
    <div className="flex flex-col gap-4 items-stretch justify-between mb-4 p-5 bg-muted/30 rounded-3xl border border-white/5">
      <div className="flex flex-col gap-3 items-stretch flex-1">
        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">Subject</label>
        <Select value={activeCourseId || ''} onValueChange={onCourseSelect}>
          <SelectTrigger className="w-full h-14 bg-background border-none rounded-2xl font-bold shadow-inner">
            <SelectValue placeholder="Select a course">
              {activeCourse?.name || 'Select a course'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-white/5">
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id} className="rounded-xl">
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-10 px-4 rounded-xl text-xs font-bold gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Course name (e.g., Calculus I)"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateCourse()}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCourse} disabled={!newCourseName.trim()}>
                Create Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {activeCourse && (
          <>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Course</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Course name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditCourse()}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditCourse} disabled={!newCourseName.trim()}>
                    Update Course
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Course</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{activeCourse.name}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onCourseDelete(activeCourse.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseSelector;