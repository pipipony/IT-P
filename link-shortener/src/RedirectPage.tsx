import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedirectPage: React.FC = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Перенаправление';
    /*
    axios
      .get(`http://127.0.0.1:9000/`)
      .then((response) => {
        const originalUrl = response.data.original_url;
        window.location.href = originalUrl;
      })
      .catch(() => {
        navigate('/');
      });
    */

    const originalUrl = 'https://github.com/pipipony/IQtest/tree/front_alena';
    window.location.href = originalUrl;

  }, [shortUrl, navigate]);

  return (
      <div className="redirect-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
};

export default RedirectPage;
