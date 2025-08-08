# Calculus ni Baks 📘✏️

_A no-backend grade calculator for Civil Engineering students who know that "If it's easy, it's not CE."_

## 🧠 What is this?

**Calculus ni Baks** is a frontend-only HTML + JavaScript tool that computes your grades based on your quiz scores, major exams, attendance, and problem sets — exactly how Sir Baks does it.

---

## 🧮 Grading Logic

### 📊 Components per Semester

Each semester (Midterm and Finals) is broken down into:

- **Quizzes (2)** – 35%
- **Major Exam (1)** – 45%
- **Attendance** – 10%
- **Problem Set** – 10%

> **Final Grade Composition:**
>
> - Midterm = 30%
> - Finals = 70%

---

## 🧩 Breakdown of Each Component

### 1. **Quiz Formula (Per Semester)**

```text
Average of 2 quizzes → ( (Q1 + Q2) / 2 )

Adjusted Grade:
((Avg / 100) * 0.5 * 100) + 50

Final Weighted:
Adjusted Grade * 0.35
```

> You can optionally input the quiz max score (e.g., out of 95). If left blank, it defaults to 100.

### 2. **Major Exam Formula**

```text
( (Raw Score / Max) * 0.5 * 100 ) + 50
→ Multiply result by 0.45
```

### 3. **Attendance (10%)**

```text
Score out of 10 = Direct percentage (e.g., 9/10 = 9%)
```

### 4. **Problem Set (10%)**

```text
Score out of 10 = Direct percentage
```

---

## 🧾 Final Grade Computation

```text
Midterm Grade = Quiz + Exam + Attendance + Problem Set
Finals Grade  = Quiz + Exam + Attendance + Problem Set

Final Grade = (Midterm * 0.30) + (Finals * 0.70)
```

---

## 🎓 Grade Point Equivalence (GPE)

```text
Grade      | GPE
-----------|-----
99–100     | 1.00
96–98      | 1.25
93–95      | 1.50
90–92      | 1.75
87–89      | 2.00
84–86      | 2.25
81–83      | 2.50
78–80      | 2.75
75–77      | 3.00
Below 75   | 5.00
```

---

## 🧰 Features

- [x] Works offline
- [x] Mobile-friendly
- [x] Handles max score anomalies (e.g. over 95 instead of 100)
- [x] Clear breakdown of Midterm, Finals, and Final GPE
- [x] Filipino academic humor included 😅

---

## 🏗️ Tech Stack

- **HTML**
- **Vanilla JavaScript**
- **Pure CSS**

---

## 📜 License

Open source and free to use. Just don’t tell Sir Baks we automated it 😅

---

## 💬 Motivational Quote

> _"IF IT’S EASY, IT’S NOT CE."_
> – The Holy Blackboard
