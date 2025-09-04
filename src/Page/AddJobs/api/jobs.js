import { API_BASE_URL } from '../utils/constants';
import { Routes, Link } from "react-router-dom"

export const fetchJobs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    return data.map(job => ({ ...job, id: job._id }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const addJob = async (jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    if (!response.ok) {
      throw new Error('Failed to add job');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
};

export const updateJob = async (jobId, jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};