import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import '../styles/UserProfile.styles.css';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulating API call
        const response = await new Promise<UserData>((resolve) => {
          setTimeout(() => {
            resolve({
              id: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              role: 'Developer'
            });
          }, 1000);
        });
        
        setUserData(response);
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      
      {userData && (
        <Card title="Personal Information">
          <div className="profile-info">
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{userData.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Email:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Role:</span>
              <span className="value">{userData.role}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}; 