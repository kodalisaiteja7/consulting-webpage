import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firestore';

export interface JobDocument {
  id?: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  department: string;
  experience: 'Junior' | 'Mid-level' | 'Senior';
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  benefits: string[];
  applicationDeadline: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobsCollection = collection(db, 'jobs');

export class JobFirestore {
  static async getAll(): Promise<JobDocument[]> {
    try {
      const q = query(jobsCollection, where('isActive', '==', true), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as JobDocument));
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<JobDocument | null> {
    try {
      const docRef = doc(db, 'jobs', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as JobDocument;
      }
      return null;
    } catch (error) {
      console.error('Error getting job by ID:', error);
      throw error;
    }
  }

  static async create(jobData: Omit<JobDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(jobsCollection, {
        ...jobData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  static async update(id: string, jobData: Partial<JobDocument>): Promise<void> {
    try {
      const docRef = doc(db, 'jobs', id);
      await updateDoc(docRef, {
        ...jobData,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'jobs', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }

  static async search(filters: {
    search?: string;
    location?: string;
    experience?: string;
    type?: string;
  }): Promise<JobDocument[]> {
    try {
      let q = query(jobsCollection, where('isActive', '==', true));

      if (filters.location) {
        q = query(q, where('location', '>=', filters.location), where('location', '<=', filters.location + '\uf8ff'));
      }

      if (filters.experience) {
        q = query(q, where('experience', '==', filters.experience));
      }

      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }

      q = query(q, orderBy('createdAt', 'desc'));

      const querySnapshot = await getDocs(q);
      let jobs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as JobDocument));

      // Client-side search for text search (Firestore doesn't support full-text search)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.department.toLowerCase().includes(searchTerm)
        );
      }

      return jobs;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }
}
