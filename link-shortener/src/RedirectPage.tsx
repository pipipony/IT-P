import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectPage: React.FC = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Перенаправление';
    axios
      .get(`http://localhost:9000/${shortUrl}`)
      .then((response) => {
        const originalUrl = response.data.originalUrl;
        window.location.href = originalUrl;
      })
      .catch(() => {
        navigate('/');
      });
  }, []);

  return (
      <div className="redirect-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
};

export default RedirectPage;
