// ตัวอย่างคำตอบที่เก็บใน JSON
const answers = {
    "2566": {
        "A": ["100", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3", "1", "2", "3"],
        "B": ["3", "2", "1", "3", "2", "1", "3", "2", "1", "3", "2", "1", "3", "2", "1", "3", "2", "1", "3", "2", "1", "3", "2", "1", "3", "2", "1", "3", "2", "1"]
    }
};

// สร้างฟอร์มสำหรับ 30 ข้อ
document.addEventListener("DOMContentLoaded", function () {
    const questionSection = document.getElementById("question-section");
    for (let i = 1; i <= 30; i++) {
        const questionRow = document.createElement("div");
        questionRow.className = "question-row";

        const questionNumber = document.createElement("span");
        questionNumber.textContent = i + ".";
        questionRow.appendChild(questionNumber);

        for (let j = 1; j <= 3; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `q${i}_${j}`;
            questionRow.appendChild(input);
        }

        questionSection.appendChild(questionRow);
    }
});

// ฟังก์ชันตรวจสอบคำตอบ
function checkAnswers() {
    const year = document.getElementById("year").value.trim();
    const set = document.getElementById("set").value.trim();
    const resultElement = document.getElementById("result");
    let correctAnswers = 0;

    if (answers[year] && answers[year][set]) {
        const correctSetAnswers = answers[year][set];

        for (let i = 1; i <= 30; i++) {
            const userAnswers = [];
            for (let j = 1; j <= 3; j++) {
                userAnswers.push(document.getElementById(`q${i}_${j}`).value.trim());
            }

            const correctAnswersForQuestion = correctSetAnswers[i - 1].split('');

            if (userAnswers.join('') === correctAnswersForQuestion.join('')) {
                correctAnswers++;
            }
        }

        resultElement.textContent = `คุณตอบถูก ${correctAnswers} ข้อจาก 30 ข้อ`;
    } else {
        resultElement.textContent = "ไม่พบปีพ.ศ.หรือชุดข้อสอบนี้";
    }
}
