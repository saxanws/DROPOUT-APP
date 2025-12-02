"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function Home() {
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    major: "",
    gpa_current: "",
    study_hours_per_week: "",
    attendance_rate: "",
    course_failures: "",
    semester_credits: "",
    stress_level: 5,
    sleep_hours_per_night: "",

    // newly added fields
    socioeconomic_status: "",
    mental_health_support: "",
    housing_stability: "",
    financial_aid: "",
    family_support: "",
    extracurricular_activity: "",
    employment_hours_per_week: "",
    commute_time_minutes: "",
    academic_advising: "",
    peer_influence: "",
    internet_access: "",
    course_satisfaction: "",
    learning_style_alignment: "",
    previous_dropout_risk: "",
    engagement_platform_usage: "",
    assignment_submission_rate: ""
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const prompt = `
age: ${form.age},
gender: ${form.gender},
major: ${form.major},
gpa_current: ${form.gpa_current},
study_hours_per_week: ${form.study_hours_per_week},
attendance_rate: ${form.attendance_rate},
semester_credits: ${form.semester_credits},
course_failures: ${form.course_failures},
stress_level: ${form.stress_level},
sleep_hours_per_night: ${form.sleep_hours_per_night},
assignment_submission_rate: ${form.assignment_submission_rate},
previous_dropout_risk: ${form.previous_dropout_risk},
socioeconomic_status: ${form.socioeconomic_status},
mental_health_support: ${form.mental_health_support},
housing_stability: ${form.housing_stability},
financial_aid: ${form.financial_aid},
family_support: ${form.family_support},
extracurricular_activity: ${form.extracurricular_activity},
employment_hours_per_week: ${form.employment_hours_per_week},
commute_time_minutes: ${form.commute_time_minutes},
academic_advising: ${form.academic_advising},
peer_influence: ${form.peer_influence},
internet_access: ${form.internet_access},
course_satisfaction: ${form.course_satisfaction},
learning_style_alignment: ${form.learning_style_alignment},
engagement_platform_usage: ${form.engagement_platform_usage}
    `;

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.output);
      }
    } catch {
      setError("Error: unable to connect to prediction API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center p-6 gap-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Student Dropout Risk Predictor
          </h1>
        </div>
        <p className="text-gray-600 text-sm">Analyze student data to predict dropout risk</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl grid gap-6 border border-gray-100"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* core / important fields */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Age
            </label>
            <input
              name="age"
              placeholder="Enter age"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.age}
              onChange={handleChange}
              type="number"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Gender
            </label>
            <select
              name="gender"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Major
            </label>
            <select
              name="major"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white"
              value={form.major}
              onChange={handleChange}
            >
              <option value="">Select a major</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Business">Business</option>
              <option value="Engineering">Engineering</option>
              <option value="Education">Education</option>
              <option value="Health Sciences">Health Sciences</option>
              <option value="Communications">Communications</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Current GPA
            </label>
            <input
              name="gpa_current"
              placeholder="0.00 - 4.00"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.gpa_current}
              onChange={handleChange}
              type="number"
              min={0}
              max={4}
              step={0.01}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Semester Credits
            </label>
            <input
              name="semester_credits"
              placeholder="Number of credits"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.semester_credits}
              onChange={handleChange}
              type="number"
              min={0}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Study Hours/Week
            </label>
            <input
              name="study_hours_per_week"
              placeholder="Hours per week"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.study_hours_per_week}
              onChange={handleChange}
              type="number"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Attendance Rate (%)
            </label>
            <input
              name="attendance_rate"
              placeholder="0 - 100"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.attendance_rate}
              onChange={handleChange}
              type="number"
              min={0}
              max={100}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Course Failures
            </label>
            <input
              name="course_failures"
              placeholder="Number of failed courses"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.course_failures}
              onChange={handleChange}
              type="number"
              min={0}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Assignment Submission Rate (%)
            </label>
            <input
              name="assignment_submission_rate"
              placeholder="0 - 100"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.assignment_submission_rate}
              onChange={handleChange}
              type="number"
              min={0}
              max={100}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Previous Dropout Risk
            </label>
            <select
              name="previous_dropout_risk"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-white"
              value={form.previous_dropout_risk}
              onChange={handleChange}
            >
              <option value="">Select level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Stress Level: <span className="text-indigo-600 font-bold">{form.stress_level}/10</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              name="stress_level"
              value={form.stress_level}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Sleep Hours/Night
            </label>
            <input
              name="sleep_hours_per_night"
              placeholder="Hours per night"
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
              value={form.sleep_hours_per_night}
              onChange={handleChange}
              type="number"
              min={0}
              max={12}
              step={0.1}
            />
          </div>
        </div>

        {/* Advanced toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="mt-2 w-full text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2 flex items-center justify-between hover:bg-indigo-100 transition-colors"
        >
          <span>Advanced factors</span>
          <span>{showAdvanced ? "Hide" : "Show"}</span>
        </button>

        {showAdvanced && (
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Socioeconomic Status</label>
              <select
                name="socioeconomic_status"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.socioeconomic_status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Mental Health Support</label>
              <select
                name="mental_health_support"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.mental_health_support}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Housing Stability</label>
              <select
                name="housing_stability"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.housing_stability}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="stable">Stable</option>
                <option value="unstable">Unstable</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Financial Aid</label>
              <select
                name="financial_aid"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.financial_aid}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="none">None</option>
                <option value="limited">Limited</option>
                <option value="adequate">Adequate</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Family Support</label>
              <select
                name="family_support"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.family_support}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Extracurricular Activity</label>
              <select
                name="extracurricular_activity"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.extracurricular_activity}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Employment Hours/Week</label>
              <input
                name="employment_hours_per_week"
                placeholder="Hours per week"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                value={form.employment_hours_per_week}
                onChange={handleChange}
                type="number"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Commute Time (minutes)</label>
              <input
                name="commute_time_minutes"
                placeholder="Minutes"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                value={form.commute_time_minutes}
                onChange={handleChange}
                type="number"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Academic Advising</label>
              <select
                name="academic_advising"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.academic_advising}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="regular">Regular</option>
                <option value="inconsistent">Inconsistent</option>
                <option value="none">None</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Peer Influence</label>
              <select
                name="peer_influence"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.peer_influence}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Internet Access</label>
              <select
                name="internet_access"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.internet_access}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="stable">Stable</option>
                <option value="inconsistent">Inconsistent</option>
                <option value="none">None</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Course Satisfaction</label>
              <select
                name="course_satisfaction"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.course_satisfaction}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Learning Style Alignment</label>
              <select
                name="learning_style_alignment"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.learning_style_alignment}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Engagement Platform Usage</label>
              <select
                name="engagement_platform_usage"
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
                value={form.engagement_platform_usage}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold text-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Predict Risk
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-800 p-6 rounded-2xl max-w-2xl w-full shadow-lg">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {result && !error && (
        <div className="bg-white border-l-4 border-emerald-500 rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Risk Assessment</h3>
                <p className="text-sm text-gray-600">Analysis complete</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">{result}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
