// Local storage utilities for persisting grade calculator data

export interface CourseData {
  id: string;
  name: string;
  midtermState: {
    quizScores: (number | null)[];
    quizMaxScores: (number | null)[];
    examScore: number | null;
    examMaxScore: number | null;
    attendance: number | null;
    problemSet: number | null;
  };
  finalsState: {
    quizScores: (number | null)[];
    quizMaxScores: (number | null)[];
    examScore: number | null;
    examMaxScore: number | null;
    attendance: number | null;
    problemSet: number | null;
  };
  settings: {
    quizCount: number;
    quizWeights: number[];
    examWeight: number;
    attendanceWeight: number;
    problemSetWeight: number;
    midtermWeight: number;
    finalsWeight: number;
    targetGrade: number;
  };
  lastModified: string;
}

export interface AppSettings {
  fontSize: number; // Font size in rem (0.8 to 1.4)
  theme: string;
  defaultTargetGrade: number;
}

const STORAGE_KEYS = {
  COURSES: 'grade-calculator-courses',
  ACTIVE_COURSE: 'grade-calculator-active-course',
  APP_SETTINGS: 'grade-calculator-settings'
};

// Course data management
export const saveCourses = (courses: CourseData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  } catch (error) {
    console.error('Failed to save courses:', error);
  }
};

export const loadCourses = (): CourseData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COURSES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load courses:', error);
    return [];
  }
};

export const saveCourse = (course: CourseData): void => {
  try {
    const courses = loadCourses();
    const existingIndex = courses.findIndex(c => c.id === course.id);
    
    if (existingIndex >= 0) {
      courses[existingIndex] = { ...course, lastModified: new Date().toISOString() };
    } else {
      courses.push({ ...course, lastModified: new Date().toISOString() });
    }
    
    saveCourses(courses);
  } catch (error) {
    console.error('Failed to save course:', error);
  }
};

export const deleteCourse = (courseId: string): void => {
  try {
    const courses = loadCourses();
    const filteredCourses = courses.filter(c => c.id !== courseId);
    saveCourses(filteredCourses);
    
    // If this was the active course, clear it
    if (getActiveCourseId() === courseId) {
      setActiveCourseId(null);
    }
  } catch (error) {
    console.error('Failed to delete course:', error);
  }
};

// Active course management
export const setActiveCourseId = (courseId: string | null): void => {
  try {
    if (courseId) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_COURSE, courseId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_COURSE);
    }
  } catch (error) {
    console.error('Failed to set active course:', error);
  }
};

export const getActiveCourseId = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_COURSE);
  } catch (error) {
    console.error('Failed to get active course:', error);
    return null;
  }
};

// App settings management
export const saveAppSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save app settings:', error);
  }
};

export const loadAppSettings = (): AppSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
    return stored ? JSON.parse(stored) : {
      fontSize: 1.0,
      theme: 'system',
      defaultTargetGrade: 75
    };
  } catch (error) {
    console.error('Failed to load app settings:', error);
    return {
      fontSize: 1.0,
      theme: 'system',
      defaultTargetGrade: 75
    };
  }
};

// Default course data
export const createDefaultCourse = (name: string = 'New Course'): CourseData => {
  return {
    id: crypto.randomUUID(),
    name,
    midtermState: {
      quizScores: [null, null],
      quizMaxScores: [100, 100],
      examScore: null,
      examMaxScore: 100,
      attendance: 10,
      problemSet: 10,
    },
    finalsState: {
      quizScores: [null, null],
      quizMaxScores: [100, 100],
      examScore: null,
      examMaxScore: 100,
      attendance: 10,
      problemSet: 10,
    },
    settings: {
      quizCount: 2,
      quizWeights: [0.175, 0.175], // 35% total divided by 2
      examWeight: 0.45,
      attendanceWeight: 0.10,
      problemSetWeight: 0.10,
      midtermWeight: 0.30,
      finalsWeight: 0.70,
      targetGrade: 75
    },
    lastModified: new Date().toISOString()
  };
};