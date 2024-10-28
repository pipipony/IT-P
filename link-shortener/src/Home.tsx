import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Сокращатель ссылок';
  }, []);

  const isValidUrl = useCallback((url: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );
    return urlPattern.test(url);
  }, []);

  const handleSubmit = useCallback(() => {
      setShortUrl('');
      setError('');

      if (!isValidUrl(inputUrl)) {
        setError('Неверная ссылка');
        return;
      }

      setLoading(true);
      setTimeout(() => {
          /*
          axios
            .post('http://127.0.0.1:9000/test/', { original_url: inputUrl })
            .then((response) => {
              setShortUrl(response.data.short_url);
            })
            .catch(() => {
              setError('Ошибка при создании короткой ссылки');
            })
            .finally(() => {
              setLoading(false);
            });
          */
          setShortUrl('http://shorter.ru:3000/abcdf');
          setLoading(false);
      }, 1000);
    }, [inputUrl]);

  return (
    <div className="container">
      <h1><strong>Сокращение ссылки</strong></h1>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Введите ссылку"
      />
      <button onClick={handleSubmit}>
        <strong>Сократить</strong>
      </button>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {!error && shortUrl && !loading && (
        <div className="short-url">
          <h2>
            Короткая ссылка: <Link to={`/${shortUrl.split('/').pop()}`}>{shortUrl}</Link>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
