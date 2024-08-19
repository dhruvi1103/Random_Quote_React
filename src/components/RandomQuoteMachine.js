import React, { useState, useEffect } from 'react';
import './RandomQuoteMachine.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

const RandomQuoteMachine = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const fetchRandomQuote = () => {
    setIsLoading(true);

    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];

        setQuote(randomQuote.text);

        const authorName = randomQuote.author ? randomQuote.author.split(',')[0] : 'Unknown';

        setAuthor(authorName);

        setIsLoading(false);

        changeColors();
      })
      .catch((error) => console.error(error));
  };

  const changeColors = () => {
    const newRandomColor = getRandomColor();
    document.body.style.backgroundColor = newRandomColor;
    document.body.style.color = newRandomColor;
    setRandomColor(newRandomColor);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [randomColor, setRandomColor] = useState(getRandomColor());

  const tweetQuote = () => {
    // URL-encode the quote and author for Twitter sharing
    const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

    window.open(tweetUrl, '_blank');
  };

  const instagramQuote = () => {
    const instagramText = `"${quote}" - ${author}`;
    const instagramUrl = `https://www.instagram.com/create/story/?text=${encodeURIComponent(
      instagramText
    )}`;

    window.open(instagramUrl, '_blank');
  };

  return (
    <div>
      <div id="quote-box">
        {isLoading ? (
          <div className="loading">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="quote-text">
              <FontAwesomeIcon icon={faQuoteLeft} />
              {quote}
            </div>
            <div className="quote-author">- {author}</div>
            <div className="buttons">
              <button
                id="new-quote"
                className="btn btn-primary"
                onClick={fetchRandomQuote}
                style={{ backgroundColor: randomColor }}
              >
                New Quote
              </button>
              <div className="social-media-buttons">
                <button
                  id="tweet-quote"
                  className="btn"
                  onClick={tweetQuote}
                  style={{ color: randomColor }}
                >
                  <FontAwesomeIcon icon={faTwitter} alt="Twitter Icon" />
                </button>
                <button
                  id="instagram-quote"
                  className="btn"
                  onClick={instagramQuote}
                  style={{ color: randomColor }}
                >
                  <FontAwesomeIcon icon={faInstagram} alt="Instagram Icon" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="footer">by <a href='https://adarsh-sharma783.github.io/Portfolio-React/' target='_blank' rel='noreferrer'>Adarsh</a></div>
    </div>
  );
};

export default RandomQuoteMachine;
