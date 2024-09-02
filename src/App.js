import React, { useState } from "react";
import "./App.css";

function App() {
  const [circleState, setCircleState] = useState("big");
  const [subCircles, setSubCircles] = useState([]);
  const [expandingCircle, setExpandingCircle] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isRandomKeywordPage, setIsRandomKeywordPage] = useState(false);
  const [isRandomTextPage, setIsRandomTextPage] = useState(false);
  const [isRandomStoryPage, setIsRandomStoryPage] = useState(false);

  const handleMainCircleClick = () => {
    if (circleState === "big") {
      setCircleState("small");
      setSubCircles([
        { label: "랜덤\n키워드", description: "키워드 생성" },
        { label: "랜덤\n캐릭터", description: "캐릭터 생성" },
        { label: "AI픽\n랜덤\n키워드", description: "AI 추천" },
        { label: "AI픽\n랜덤\n스토리", description: "AI 스토리" },
        { label: "AI API\n생성", description: "API 생성" },
        { label: "랜덤\n스토리", description: "스토리 생성" }
      ]);
    }
  };

  const handleSubCircleClick = (index, label) => {
    setExpandingCircle(index);

    setTimeout(() => {
      if (label === "랜덤\n키워드") {
        setExpandingCircle(null);
        setIsRandomKeywordPage(true);
      } else if (label === "랜덤\n스토리") {
        setExpandingCircle(null);
        setIsRandomStoryPage(true);      
      } else if (label === "AI픽\n랜덤\n키워드" || label === "AI픽\n랜덤\n스토리" || label === "AI API\n생성" || label === "랜덤\n캐릭터") {
        setExpandingCircle(null);
        setAlertMessage("해당 페이지는 개발 중입니다.");
      } else {
        alert(`${label} 페이지로 이동합니다.`);
        setExpandingCircle(null);
        setCircleState("big");
        setSubCircles([]);
      }
    }, 600);
  };

  const closeAlert = () => {
    setAlertMessage(null);
    setCircleState("big");
    setSubCircles([]);
  };

  const [selected, setSelected] = useState([
    { id: 1, title: '직업', checker: false, count: 1 },
    { id: 2, title: '장르', checker: false, count: 1 },
    { id: 3, title: '시간', checker: false, count: 1 },
    { id: 4, title: '장소', checker: false, count: 1 },
    { id: 5, title: '추상적개념', checker: false, count: 1 },
    { id: 6, title: '랜덤단어', checker: false, count: 1 },
    { id: 7, title: '판타지직업', checker: false, count: 1 },
    { id: 8, title: '판타지장소', checker: false, count: 1 },
  ]);

  const [result, setResult] = useState({});

  const checkHandled = (id) => {
    const updatedSelection = selected.map((item) =>
      item.id === id ? { ...item, checker: !item.checker } : item
    );
    setSelected(updatedSelection);
  };

  const handleCountChange = (id, value) => {
    const updatedSelection = selected.map((item) =>
      item.id === id ? { ...item, count: Math.max(1, Number(value)) } : item
    );
    setSelected(updatedSelection);
  };

  const extractKeywords = async () => {
    const selections = selected
      .filter(item => item.checker)
      .map(item => ({ keyword: item.title, count: item.count }));

    if (selections.length === 0) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_FRO}/keywords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selections }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setResult(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const goBack = () => {
    setIsRandomKeywordPage(false);
    setIsRandomTextPage(false);
    setIsRandomStoryPage(false);

    // 결과 상태 초기화
    setResult({});
    setResultstory({});
    
    setCircleState("big");
    setSubCircles([]);
  };

  const [selstory, setSelstory] = useState([
    { id: 1, title: '학원물', checker: false, count: 1 },
    { id: 2, title: '일상물', checker: false, count: 1 },
    { id: 3, title: '판타지', checker: false, count: 1 },
    { id: 4, title: '무협지', checker: false, count: 1 },
    { id: 5, title: '로멘스', checker: false, count: 1 },
    { id: 6, title: '스포츠', checker: false, count: 1 },
    { id: 7, title: '미스터리', checker: false, count: 1 },
  ]);
  const [resultstory, setResultstory] = useState({});
  const checkHandledstory = (id) => {
    const updatedSelection = selstory.map((item) =>
      item.id === id ? { ...item, checker: !item.checker } : item
    );
    setSelstory(updatedSelection);
  };

  const handleCountChangestory = (id, value) => {
    const updatedSelection = selstory.map((item) =>
      item.id === id ? { ...item, count: Math.max(1, Number(value)) } : item
    );
    setSelstory(updatedSelection);
  };

  const extractstorys = async () => {
    const selections = selstory
      .filter(item => item.checker)
      .map(item => ({ storys: item.title, count: item.count }));

    if (selections.length === 0) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_FRO}/storys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selections }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setResultstory(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      {alertMessage && (
        <div className="alert-overlay" onClick={closeAlert}>
          <div className="alert-box">
            <img src="/warning.png" alt="Warning" className="alert-image" />
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
      {!isRandomKeywordPage ? (!isRandomTextPage ? ( (!isRandomStoryPage ? (
        <>
          <div
            className={`main-circle ${circleState}`}
            onClick={handleMainCircleClick}
          >
            {circleState === "big" && "클릭하세요"}
          </div>
          {subCircles.length > 0 && (
            <div className="sub-circles">
              {subCircles.map((circle, index) => (
                <div
                  key={index}
                  className={`sub-circle ${expandingCircle === index ? 'expand' : ''}`}
                  onClick={() => handleSubCircleClick(index, circle.label)}
                >
                  <span className="label">{circle.label}</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="random-keyword-page">
        <h1 className="main-title">랜덤 스토리 생성</h1>
        <div className="container">
          <div className="left-panel">
            <div className="checkbox-container">
              {selstory.map((t) => (
                <div key={t.id} className="checkbox-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={t.checker}
                      onChange={() => checkHandledstory(t.id)}
                    />
                    {t.title}
                  </label>
                  {t.checker && (
                    <div className="count-container">
                      <label>
                        <input
                          type="number"
                          min="1"
                          value={t.count}
                          onChange={(e) => handleCountChangestory(t.id, e.target.value)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="button-container">
              <button className="extract-button" onClick={extractstorys}>
                생성
              </button>
              <button className="back-button" onClick={goBack}>
                돌아가기
              </button>
            </div>
          </div>
          <div className="right-panel">
            {Object.entries(resultstory).length > 0 ? (
              <ul>
                {Object.entries(resultstory).map(([storys, values]) => (
                  <li key={storys}>
                    <strong>{storys}:</strong> {Array.isArray(values) ? values.join(', ') : values}
                  </li>
                ))}
              </ul>
            ) : (
              <p>생성된 스토리가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      )
     )) : ( <div className="random-keyword-page">
        <h1 className="main-title">랜덤 캐릭터 생성</h1>
        <div className="container">
          <div className="left-panel">
            <div className="checkbox-container">
              {selected.map((t) => (
                <div key={t.id} className="checkbox-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={t.checker}
                      onChange={() => checkHandled(t.id)}
                    />
                    {t.title}
                  </label>
                  {t.checker && (
                    <div className="count-container">
                      <label>
                        <input
                          type="number"
                          min="1"
                          value={t.count}
                          onChange={(e) => handleCountChange(t.id, e.target.value)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="button-container">
              <button className="extract-button" onClick={extractKeywords}>
                생성
              </button>
              <button className="back-button" onClick={goBack}>
                돌아가기
              </button>
            </div>
          </div>
          <div className="right-panel">
            {Object.entries(result).length > 0 ? (
              <ul>
                {Object.entries(result).map(([keyword, values]) => (
                  <li key={keyword}>
                    <strong>{keyword}:</strong> {Array.isArray(values) ? values.join(', ') : values}
                  </li>
                ))}
              </ul>
            ) : (
              <p>생성된 문장이 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      ) 
    ) : (
        <div className="random-keyword-page">
          <h1 className="main-title">랜덤 키워드 생성</h1>
          <div className="container">
            <div className="left-panel">
              <div className="checkbox-container">
                {selected.map((t) => (
                  <div key={t.id} className="checkbox-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={t.checker}
                        onChange={() => checkHandled(t.id)}
                      />
                      {t.title}
                    </label>
                    {t.checker && (
                      <div className="count-container">
                        <label>
                          <input
                            type="number"
                            min="1"
                            value={t.count}
                            onChange={(e) => handleCountChange(t.id, e.target.value)}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="button-container">
                <button className="extract-button" onClick={extractKeywords}>
                  생성
                </button>
                <button className="back-button" onClick={goBack}>
                  돌아가기
                </button>
              </div>
            </div>
            <div className="right-panel">
              {Object.entries(result).length > 0 ? (
                <ul>
                  {Object.entries(result).map(([keyword, values]) => (
                    <li key={keyword}>
                      <strong>{keyword}:</strong> {Array.isArray(values) ? values.join(', ') : values}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>생성된 키워드가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;