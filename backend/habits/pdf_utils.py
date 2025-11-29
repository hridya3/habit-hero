from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.graphics import renderPDF
from reportlab.graphics.shapes import Drawing
from reportlab.graphics.charts.lineplots import LinePlot
from reportlab.graphics.charts.textlabels import Label
from io import BytesIO
from collections import defaultdict
from datetime import datetime
from reportlab.lib import colors


def create_progress_chart(checkins):
    if not checkins:
        return None

    # Prepare data
    dates = sorted([c["date"] for c in checkins])
    values = list(range(1, len(dates) + 1)) 
    drawing = Drawing(400, 200)
    chart = LinePlot()
    chart.x = 40
    chart.y = 40
    chart.height = 140
    chart.width = 320

    data = [(i, values[i]) for i in range(len(values))]
    chart.data = [data]
    chart.lines[0].strokeColor = colors.HexColor("#4F46E5")


    chart.xValueAxis.valueMin = 0
    chart.yValueAxis.valueMin = 0

    title = Label()
    title.setOrigin(200, 185)
    title.setText("Progress Over Time")
    title.fontSize = 12

    drawing.add(chart)
    drawing.add(title)

    return drawing


def generate_habit_report(habits):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4
    y = height - 50

    # Title
    p.setFont("Helvetica-Bold", 20)
    p.drawString(50, y, "Habit Progress Report")
    y -= 40

    p.setFont("Helvetica", 12)

    # -----------------------
    # CATEGORY SUMMARY
    # -----------------------
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, y, "📊 Category-wise Summary")
    y -= 25
    p.setFont("Helvetica", 12)

    category_summary = defaultdict(int)

    for habit in habits:
        category_summary[habit["category"]] += len(habit["checkins"])

    for cat, count in category_summary.items():
        p.drawString(60, y, f"- {cat}: {count} total check-ins")
        y -= 18

    y -= 20

    
    for habit in habits:

        if y < 260:
            p.showPage()
            y = height - 50

        p.setFont("Helvetica-Bold", 16)
        p.drawString(50, y, f"Habit: {habit['name']}")
        y -= 25

        p.setFont("Helvetica", 12)
        p.drawString(60, y, f"Category: {habit['category']}")
        y -= 18
        p.drawString(60, y, f"Frequency: {habit['frequency']}")
        y -= 18
        p.drawString(60, y, f"Start Date: {habit['start_date']}")
        y -= 25

        # # Progress Chart
        # chart = create_progress_chart(habit["checkins"])
        # if chart:
        #     renderPDF.draw(chart, p, 60, y - 200)
        #     y -= 220
        # else:
        #     p.drawString(60, y, "No chart available (no check-ins yet).")
        #     y -= 40

        # Check-in List
        p.setFont("Helvetica-Bold", 12)
        p.drawString(60, y, "Check-ins:")
        y -= 20

        p.setFont("Helvetica", 11)

        if not habit["checkins"]:
            p.drawString(75, y, "- No check-ins")
            y -= 20
        else:
            for c in habit["checkins"]:
                p.drawString(75, y, f"- {c['date']} | {c.get('note','No note')}")
                y -= 16

        y -= 25

    p.save()
    buffer.seek(0)
    return buffer
