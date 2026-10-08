// 建立所有測驗題目資料。
const quizQuestions = [
  // 建立第一題。
  {
    // 設定第一題題目。
    question: "在 JavaScript 中，哪一個指令可以在主控台輸出文字？",
    // 設定第一題的四個選項。
    options: ["print()", "console.log()", "display()", "write()"],
    // 設定第一題正確答案的索引值。
    answer: 1
  },
  // 建立第二題。
  {
    // 設定第二題題目。
    question: "在 p5.js 中，哪一個函式會在程式開始時執行一次？",
    // 設定第二題的四個選項。
    options: ["start()", "draw()", "setup()", "begin()"],
    // 設定第二題正確答案的索引值。
    answer: 2
  },
  // 建立第三題。
  {
    // 設定第三題題目。
    question: "在 JavaScript 中，哪一個指令可以宣告不可重新指定的變數？",
    // 設定第三題的四個選項。
    options: ["var", "let", "const", "fixed"],
    // 設定第三題正確答案的索引值。
    answer: 2
  },
  // 建立第四題。
  {
    // 設定第四題題目。
    question: "在 p5.js 中，哪一個函式會重複執行以繪製動畫？",
    // 設定第四題的四個選項。
    options: ["setup()", "loop()", "draw()", "repeat()"],
    // 設定第四題正確答案的索引值。
    answer: 2
  },
  // 建立第五題。
  {
    // 設定第五題題目。
    question: "哪一個運算子可以比較兩個值是否相等且型別相同？",
    // 設定第五題的四個選項。
    options: ["=", "==", "===", "!="],
    // 設定第五題正確答案的索引值。
    answer: 2
  }
];

// 宣告目前題目的索引值。
let currentQuestion = 0;

// 宣告目前答對的題數。
let score = 0;

// 宣告使用者選擇的選項索引值。
let selectedOption = -1;

// 宣告目前題目是否已經回答。
let hasAnswered = false;

// 宣告測驗是否已經完成。
let isFinished = false;

// 宣告選項點擊區域陣列。
let optionRects = [];

// 宣告下一題按鈕的點擊區域。
let nextButtonRect = {
  // 設定按鈕 X 座標。
  x: 0,
  // 設定按鈕 Y 座標。
  y: 0,
  // 設定按鈕寬度。
  width: 220,
  // 設定按鈕高度。
  height: 58
};

// 宣告重新測驗按鈕的點擊區域。
let restartButtonRect = {
  // 設定按鈕 X 座標。
  x: 0,
  // 設定按鈕 Y 座標。
  y: 0,
  // 設定按鈕寬度。
  width: 230,
  // 設定按鈕高度。
  height: 58
};

// 宣告上一次觸控事件時間。
let lastTouchTime = 0;

// p5.js 初始化函式。
function setup() {
  // 建立符合瀏覽器視窗大小的畫布。
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平置中與垂直置中。
  textAlign(CENTER, CENTER);

  // 設定矩形以中心點為繪製基準。
  rectMode(CENTER);

  // 設定文字換行模式。
  textWrap(WORD);

  // 重新計算畫布所需高度。
  refreshCanvasSize();

  // 設定畫面更新頻率。
  frameRate(60);
}

// p5.js 每一幀執行一次的函式。
function draw() {
  // 設定畫布背景顏色。
  background("#f8f9fa");

  // 判斷測驗是否已經完成。
  if (isFinished) {
    // 繪製結果畫面。
    drawResultScreen();
  } else {
    // 繪製測驗畫面。
    drawQuizScreen();
  }
}

// 取得響應式版面設定。
function getQuizLayout() {
  // 判斷目前是否為手機寬度。
  const isMobile = width <= 600;

  // 判斷目前是否為平板寬度。
  const isTablet = width > 600 && width <= 1024;

  // 判斷目前是否為矮螢幕。
  const isShortScreen = height <= 650;

  // 設定畫面左右邊界。
  const sidePadding = isMobile ? 16 : isTablet ? 28 : 48;

  // 計算內容區域寬度。
  const contentWidth = min(width - sidePadding * 2, 920);

  // 計算選項寬度。
  const optionWidth = min(width - sidePadding * 2, 820);

  // 計算標題文字大小。
  const titleSize = isMobile ? 23 : isTablet ? 30 : 38;

  // 計算題數文字大小。
  const counterSize = isMobile ? 15 : isTablet ? 18 : 22;

  // 計算題目文字大小。
  const questionSize = isMobile ? 18 : isTablet ? 23 : 29;

  // 計算選項文字大小。
  const optionSize = isMobile ? 16 : isTablet ? 20 : 24;

  // 計算選項高度。
  const optionHeight = isMobile ? 56 : isTablet ? 64 : 70;

  // 計算選項垂直間距。
  const optionGap = isMobile ? 70 : isTablet ? 82 : 92;

  // 計算標題 Y 座標。
  const titleY = isShortScreen ? 38 : height * 0.08;

  // 計算題數 Y 座標。
  const counterY = isShortScreen ? 76 : height * 0.16;

  // 計算題目 Y 座標。
  const questionY = isShortScreen ? 135 : height * 0.26;

  // 計算選項起始 Y 座標。
  const optionStartY = isShortScreen ? 220 : height * 0.43;

  // 回傳完整版面資料。
  return {
    // 回傳手機判斷結果。
    isMobile: isMobile,
    // 回傳平板判斷結果。
    isTablet: isTablet,
    // 回傳矮螢幕判斷結果。
    isShortScreen: isShortScreen,
    // 回傳內容寬度。
    contentWidth: contentWidth,
    // 回傳選項寬度。
    optionWidth: optionWidth,
    // 回傳標題大小。
    titleSize: titleSize,
    // 回傳題數大小。
    counterSize: counterSize,
    // 回傳題目大小。
    questionSize: questionSize,
    // 回傳選項大小。
    optionSize: optionSize,
    // 回傳選項高度。
    optionHeight: optionHeight,
    // 回傳選項間距。
    optionGap: optionGap,
    // 回傳標題位置。
    titleY: titleY,
    // 回傳題數位置。
    counterY: counterY,
    // 回傳題目位置。
    questionY: questionY,
    // 回傳選項起始位置。
    optionStartY: optionStartY
  };
}

// 取得結果畫面的響應式版面設定。
function getResultLayout() {
  // 判斷目前是否為手機寬度。
  const isMobile = width <= 600;

  // 計算結果標題大小。
  const titleSize = isMobile ? 34 : min(width * 0.07, 56);

  // 計算成績文字大小。
  const scoreSize = isMobile ? 24 : min(width * 0.055, 44);

  // 計算提示文字大小。
  const messageSize = isMobile ? 18 : min(width * 0.035, 28);

  // 計算結果標題 Y 座標。
  const titleY = height * 0.25;

  // 計算成績 Y 座標。
  const scoreY = height * 0.42;

  // 計算提示文字 Y 座標。
  const messageY = height * 0.52;

  // 計算重新測驗按鈕 Y 座標。
  const buttonY = height * 0.68;

  // 回傳結果版面資料。
  return {
    // 回傳標題大小。
    titleSize: titleSize,
    // 回傳成績大小。
    scoreSize: scoreSize,
    // 回傳提示文字大小。
    messageSize: messageSize,
    // 回傳標題位置。
    titleY: titleY,
    // 回傳成績位置。
    scoreY: scoreY,
    // 回傳提示文字位置。
    messageY: messageY,
    // 回傳按鈕位置。
    buttonY: buttonY
  };
}

// 計算目前測驗畫面需要的高度。
function getRequiredQuizHeight() {
  // 取得目前響應式版面。
  const layout = getQuizLayout();

  // 計算下一題按鈕預計位置。
  const buttonY = layout.optionStartY + layout.optionGap * 4.35;

  // 計算按鈕底部位置。
  const buttonBottom = buttonY + 36;

  // 回傳所需高度並保留底部空間。
  return max(windowHeight, buttonBottom + 36);
}

// 計算結果畫面需要的高度。
function getRequiredResultHeight() {
  // 計算結果按鈕底部位置。
  const buttonBottom = windowHeight * 0.68 + 40;

  // 回傳所需畫布高度。
  return max(windowHeight, buttonBottom + 36);
}

// 重新設定畫布大小。
function refreshCanvasSize() {
  // 判斷目前是否位於結果頁面。
  if (isFinished) {
    // 取得結果頁面需要的高度。
    const resultHeight = getRequiredResultHeight();

    // 重新設定畫布寬高。
    resizeCanvas(windowWidth, resultHeight);
  } else {
    // 取得測驗頁面需要的高度。
    const quizHeight = getRequiredQuizHeight();

    // 重新設定畫布寬高。
    resizeCanvas(windowWidth, quizHeight);
  }
}

// 繪製測驗畫面。
function drawQuizScreen() {
  // 取得響應式版面。
  const layout = getQuizLayout();

  // 取得目前題目。
  const quiz = quizQuestions[currentQuestion];

  // 清除選項點擊區域。
  optionRects = [];

  // 設定標題顏色。
  fill("#1d3557");

  // 設定標題文字大小。
  textSize(layout.titleSize);

  // 繪製標題。
  text("程式設計簡易指令練習測驗", width / 2, layout.titleY);

  // 設定題數文字顏色。
  fill("#495057");

  // 設定題數文字大小。
  textSize(layout.counterSize);

  // 顯示目前題數。
  text(`第 ${currentQuestion + 1} 題 / 共 ${quizQuestions.length} 題`, width / 2, layout.counterY);

  // 設定題目文字顏色。
  fill("#212529");

  // 設定題目文字大小。
  textSize(layout.questionSize);

  // 繪製題目文字。
  text(
    quiz.question,
    width / 2,
    layout.questionY,
    layout.contentWidth,
    layout.isMobile ? 100 : 90
  );

  // 使用迴圈繪製所有選項。
  for (let i = 0; i < quiz.options.length; i++) {
    // 計算目前選項的 Y 座標。
    const optionY = layout.optionStartY + i * layout.optionGap;

    // 建立目前選項的點擊範圍。
    const optionRect = {
      // 設定選項 X 座標。
      x: width / 2,
      // 設定選項 Y 座標。
      y: optionY,
      // 設定選項寬度。
      width: layout.optionWidth,
      // 設定選項高度。
      height: layout.optionHeight
    };

    // 將選項點擊範圍加入陣列。
    optionRects.push(optionRect);

    // 繪製目前選項。
    drawOption(
      quiz.options[i],
      i,
      optionRect,
      layout.optionSize
    );
  }

  // 判斷使用者是否已經回答。
  if (hasAnswered) {
    // 計算按鈕 Y 座標。
    const buttonY = layout.optionStartY + layout.optionGap * 4.35;

    // 設定下一題按鈕位置。
    nextButtonRect.x = width / 2;

    // 設定下一題按鈕位置。
    nextButtonRect.y = buttonY;

    // 判斷是否為最後一題。
    const buttonText =
      currentQuestion === quizQuestions.length - 1 ? "查看結果" : "下一題";

    // 繪製下一題按鈕。
    drawButton(
      nextButtonRect.x,
      nextButtonRect.y,
      nextButtonRect.width,
      nextButtonRect.height,
      buttonText,
      "#457b9d",
      layout.isMobile
    );
  }
}

// 繪製單一選項。
function drawOption(optionText, optionIndex, optionRect, optionTextSize) {
  // 宣告水平移動距離。
  let offsetX = 0;

  // 宣告垂直移動距離。
  let offsetY = 0;

  // 取得正確答案索引。
  const correctAnswer = quizQuestions[currentQuestion].answer;

  // 判斷是否已經回答。
  if (hasAnswered) {
    // 判斷使用者答錯且此選項為正確答案。
    if (selectedOption !== correctAnswer && optionIndex === correctAnswer) {
      // 讓正確答案上下跳動。
      offsetY = sin(frameCount * 0.15) * 12;
    }

    // 判斷此選項是否為使用者選錯的答案。
    if (selectedOption !== correctAnswer && optionIndex === selectedOption) {
      // 讓錯誤答案左右移動。
      offsetX = sin(frameCount * 0.2) * 14;
    }
  }

  // 設定選項預設背景顏色。
  let optionColor = "#ffffff";

  // 判斷是否已經回答。
  if (hasAnswered) {
    // 判斷使用者答錯且此選項為正確答案。
    if (selectedOption !== correctAnswer && optionIndex === correctAnswer) {
      // 使用指定的正確答案顏色。
      optionColor = "#bde0fe";
    }

    // 判斷此選項是否為使用者選錯的答案。
    if (selectedOption !== correctAnswer && optionIndex === selectedOption) {
      // 使用指定的錯誤答案顏色。
      optionColor = "#e63946";
    }

    // 判斷使用者答對且此選項為正確答案。
    if (selectedOption === correctAnswer && optionIndex === correctAnswer) {
      // 使用答對時的綠色。
      optionColor = "#a8dadc";
    }
  }

  // 設定選項外框顏色。
  stroke("#6c757d");

  // 設定選項外框粗細。
  strokeWeight(2);

  // 設定選項填滿顏色。
  fill(optionColor);

  // 繪製選項矩形。
  rect(
    optionRect.x + offsetX,
    optionRect.y + offsetY,
    optionRect.width,
    optionRect.height,
    12
  );

  // 判斷目前選項是否為答錯的選項。
  if (optionIndex === selectedOption && selectedOption !== correctAnswer) {
    // 設定錯誤答案文字顏色。
    fill("#ffffff");
  } else {
    // 設定一般文字顏色。
    fill("#212529");
  }

  // 設定選項文字大小。
  textSize(optionTextSize);

  // 繪製選項文字。
  text(
    optionText,
    optionRect.x + offsetX,
    optionRect.y + offsetY,
    optionRect.width - 24,
    optionRect.height
  );
}

// 繪製按鈕。
function drawButton(
  buttonX,
  buttonY,
  buttonWidth,
  buttonHeight,
  buttonText,
  buttonColor,
  isMobile
) {
  // 計算響應式按鈕寬度。
  const responsiveWidth = isMobile ? min(width * 0.72, 230) : buttonWidth;

  // 計算響應式按鈕高度。
  const responsiveHeight = isMobile ? 54 : buttonHeight;

  // 更新下一題按鈕寬度。
  nextButtonRect.width = responsiveWidth;

  // 更新下一題按鈕高度。
  nextButtonRect.height = responsiveHeight;

  // 更新重新測驗按鈕寬度。
  restartButtonRect.width = responsiveWidth;

  // 更新重新測驗按鈕高度。
  restartButtonRect.height = responsiveHeight;

  // 設定按鈕外框顏色。
  stroke("#343a40");

  // 設定按鈕外框粗細。
  strokeWeight(2);

  // 設定按鈕背景顏色。
  fill(buttonColor);

  // 繪製按鈕。
  rect(buttonX, buttonY, responsiveWidth, responsiveHeight, 12);

  // 設定按鈕文字顏色。
  fill("#ffffff");

  // 設定按鈕文字大小。
  textSize(isMobile ? 18 : 24);

  // 繪製按鈕文字。
  text(buttonText, buttonX, buttonY, responsiveWidth - 20, responsiveHeight);
}

// 選擇答案。
function selectOption(optionIndex) {
  // 判斷是否已經回答。
  if (hasAnswered) {
    // 避免重複作答。
    return;
  }

  // 記錄使用者的選項。
  selectedOption = optionIndex;

  // 設定目前題目已回答。
  hasAnswered = true;

  // 取得正確答案索引。
  const correctAnswer = quizQuestions[currentQuestion].answer;

  // 判斷使用者是否答對。
  if (selectedOption === correctAnswer) {
    // 增加答對題數。
    score++;
  }
}

// 前往下一題或結果頁面。
function nextQuestion() {
  // 判斷是否為最後一題。
  if (currentQuestion === quizQuestions.length - 1) {
    // 設定測驗完成。
    isFinished = true;

    // 重新設定結果頁面畫布大小。
    refreshCanvasSize();

    // 結束函式。
    return;
  }

  // 前往下一題。
  currentQuestion++;

  // 清除上一題答案。
  selectedOption = -1;

  // 設定新題目尚未回答。
  hasAnswered = false;

  // 重新設定測驗畫布大小。
  refreshCanvasSize();
}

// 繪製結果畫面。
function drawResultScreen() {
  // 取得結果畫面版面。
  const layout = getResultLayout();

  // 設定結果標題顏色。
  fill("#1d3557");

  // 設定結果標題大小。
  textSize(layout.titleSize);

  // 顯示結果標題。
  text("測驗完成！", width / 2, layout.titleY);

  // 設定成績文字顏色。
  fill("#343a40");

  // 設定成績文字大小。
  textSize(layout.scoreSize);

  // 顯示測驗成績。
  text(`你答對了 ${score} / ${quizQuestions.length} 題`, width / 2, layout.scoreY);

  // 設定提示文字大小。
  textSize(layout.messageSize);

  // 判斷分數並顯示不同提示。
  if (score === quizQuestions.length) {
    // 顯示滿分提示。
    text("太棒了！全部答對！", width / 2, layout.messageY);
  } else if (score >= 3) {
    // 顯示良好提示。
    text("表現很好，繼續保持！", width / 2, layout.messageY);
  } else {
    // 顯示鼓勵提示。
    text("再練習幾次，你一定會進步！", width / 2, layout.messageY);
  }

  // 設定重新測驗按鈕 X 座標。
  restartButtonRect.x = width / 2;

  // 設定重新測驗按鈕 Y 座標。
  restartButtonRect.y = layout.buttonY;

  // 建立結果畫面按鈕版面設定。
  const resultButtonIsMobile = width <= 600;

  // 繪製重新測驗按鈕。
  drawButton(
    restartButtonRect.x,
    restartButtonRect.y,
    restartButtonRect.width,
    restartButtonRect.height,
    "重新測驗",
    "#2a9d8f",
    resultButtonIsMobile
  );
}

// 重新開始測驗。
function restartQuiz() {
  // 將目前題目重設為第一題。
  currentQuestion = 0;

  // 將分數重設為零。
  score = 0;

  // 清除選擇的選項。
  selectedOption = -1;

  // 將回答狀態重設為未回答。
  hasAnswered = false;

  // 將完成狀態重設為未完成。
  isFinished = false;

  // 重新設定畫布尺寸。
  refreshCanvasSize();
}

// 判斷點擊座標是否位於矩形範圍內。
function isInsideRectangle(pointerX, pointerY, rectangle) {
  // 回傳座標是否在矩形範圍內。
  return (
    pointerX >= rectangle.x - rectangle.width / 2 &&
    pointerX <= rectangle.x + rectangle.width / 2 &&
    pointerY >= rectangle.y - rectangle.height / 2 &&
    pointerY <= rectangle.y + rectangle.height / 2
  );
}

// 處理滑鼠與觸控點擊。
function handlePointerPress(pointerX, pointerY) {
  // 判斷是否為觸控事件後的模擬滑鼠事件。
  if (millis() - lastTouchTime < 500) {
    // 忽略重複觸發。
    return;
  }

  // 判斷測驗是否已完成。
  if (isFinished) {
    // 判斷是否點擊重新測驗按鈕。
    if (isInsideRectangle(pointerX, pointerY, restartButtonRect)) {
      // 重新開始測驗。
      restartQuiz();
    }

    // 結束結果頁面處理。
    return;
  }

  // 判斷目前是否尚未回答。
  if (!hasAnswered) {
    // 使用迴圈檢查所有選項。
    for (let i = 0; i < optionRects.length; i++) {
      // 判斷是否點擊目前選項。
      if (isInsideRectangle(pointerX, pointerY, optionRects[i])) {
        // 選擇目前選項。
        selectOption(i);

        // 停止檢查其他選項。
        break;
      }
    }
  } else {
    // 判斷是否點擊下一題按鈕。
    if (isInsideRectangle(pointerX, pointerY, nextButtonRect)) {
      // 前往下一題。
      nextQuestion();
    }
  }
}

// 處理滑鼠按下事件。
function mousePressed() {
  // 處理滑鼠點擊座標。
  handlePointerPress(mouseX, mouseY);

  // 阻止瀏覽器預設滑鼠行為。
  return false;
}

// 處理觸控開始事件。
function touchStarted() {
  // 記錄觸控事件發生時間。
  lastTouchTime = millis();

  // 判斷是否有觸控點。
  if (touches.length > 0) {
    // 取得第一個觸控點 X 座標。
    const touchX = touches[0].x;

    // 取得第一個觸控點 Y 座標。
    const touchY = touches[0].y;

    // 直接處理觸控點擊。
    handleTouchPress(touchX, touchY);
  }

  // 阻止瀏覽器預設觸控行為。
  return false;
}

// 處理觸控點擊。
function handleTouchPress(pointerX, pointerY) {
  // 判斷測驗是否已完成。
  if (isFinished) {
    // 判斷是否點擊重新測驗按鈕。
    if (isInsideRectangle(pointerX, pointerY, restartButtonRect)) {
      // 重新開始測驗。
      restartQuiz();
    }

    // 結束結果畫面處理。
    return;
  }

  // 判斷目前是否尚未回答。
  if (!hasAnswered) {
    // 使用迴圈檢查所有選項。
    for (let i = 0; i < optionRects.length; i++) {
      // 判斷是否點擊目前選項。
      if (isInsideRectangle(pointerX, pointerY, optionRects[i])) {
        // 選擇目前選項。
        selectOption(i);

        // 停止檢查其他選項。
        break;
      }
    }
  } else {
    // 判斷是否點擊下一題按鈕。
    if (isInsideRectangle(pointerX, pointerY, nextButtonRect)) {
      // 前往下一題。
      nextQuestion();
    }
  }
}

// 處理瀏覽器視窗大小改變。
function windowResized() {
  // 重新計算畫布大小。
  refreshCanvasSize();
}