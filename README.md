# Habit Hero – Full Stack Habit Tracking App

Habit Hero is a full‑stack habit tracking application built with **Django REST Framework** and **React**. It helps users build strong habits through daily check‑ins, reminders, analytics, and downloadable PDF reports.

---

## Features

### Habit Management

* Create, edit, and delete habits
* Organize habits by category (fitness, productivity, health, etc.)
* Choose frequency: daily / weekly
* Track habit start dates

### Daily Check-ins

* Mark habits as completed for today
* Add check‑in notes
* Prevent duplicate daily check‑ins
* Auto-refresh habit progress

###  Smart Motivational Reminders

* Automatic popup message upon opening the website
* Motivational quotes if habits are pending
* Congratulations message when all habits are completed
* Built using a custom React Hook

###  Analytics

* Category-wise habit breakdown
* Overview of habit performance
* Clean and simple insights

###  PDF Progress Report

Includes:

* Habit details
* Category summaries
* Check-in history

###  Modern UI

* Responsive design
* Smooth popup animations
* Clean card-based layout
* Professional color theme

---

## Tech Stack

### **Frontend**

* React (CRA)
* React Router
* Axios
* Custom CSS

### **Backend**

* Django
* Django REST Framework
* ReportLab (PDF generation)
* SQLite / PostgreSQL compatible

---

##  Project Structure

```
Habit-Hero/
│
├── backend/
│   ├── habits/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── pdf_utils.py
│   │   └── urls.py
│   ├── habitbackend/
│   └── manage.py
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── hooks/
    │   ├── api/
    │   └── data/
    └── package.json
```

---

#  Setup Instructions

##  1. Clone Repository

```
git clone https://github.com/hridya3/habit-hero.git
cd habit-hero
```

---

#  Backend Setup (Django)

### Create Virtual Environment

```
cd backend
python -m venv venv
venv\Scripts\activate
```

### Install Dependencies

```
pip install -r requirements.txt
```

### Apply Migrations

```
python manage.py migrate
```

### Run Backend Server

```
python manage.py runserver
```

Backend URL: http://127.0.0.1:8000

---

#  Frontend Setup (React)

```
cd ../frontend/habit-hero
npm install
npm start
```

Frontend URL: http://localhost:3000

---

#  API Endpoints

### **Habits**

| Method | Endpoint          | Description  |
| ------ | ----------------- | ------------ |
| GET    | /api/habits/      | List habits  |
| POST   | /api/habits/      | Create habit |
| GET    | /api/habits/<id>/ | Habit detail |
| PUT    | /api/habits/<id>/ | Edit habit   |
| DELETE | /api/habits/<id>/ | Delete habit |

### **Check-ins**

| Method | Endpoint       | Description  |
| ------ | -------------- | ------------ |
| POST   | /api/checkins/ | Add check-in |

### **PDF Export**

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | /api/export-pdf/ | Download habit report |

---

#  PDF Report

The exported PDF contains:

* Habit name, category, frequency
* Check-in list
* Category-wise summary
* Auto-generated using ReportLab

---

#  Daily Motivational Reminder

A custom React Hook (`useDailyReminder`) triggers a popup:

* Motivational quote when habits remain
* Success message when habits are completed
* Smooth animated popup component

---

#  Author

**Hridya R Mathew**
Full Stack Developer
GitHub:  https://github.com/hridya3

---
