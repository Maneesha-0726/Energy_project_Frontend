import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const DataScience = () => {
  const [step, setStep] = useState(1);

  const [imageFile, setImageFile] = useState(null);
  const [yoloResult, setYoloResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // NEW STATES FOR ENERGY INPUT
  const [location, setLocation] = useState("Home");
  const [capacity, setCapacity] = useState(5);
  const [sunHours, setSunHours] = useState(5);
  const [fileName, setFileName] = useState("No file chosen");
  const BACKEND_URL = "https://energy-project-backend-ol3t.onrender.com";

  const pageStyle = {
    background:
      "linear-gradient(135deg, #003d7a, #0059b3, #007bff, #4dabf7)",
    minHeight: "100vh",
    paddingTop: "150px",
    paddingBottom: "70px",
  };

  const glassCard = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(12px)",
    borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "35px",
    boxShadow: "0px 10px 40px rgba(0,0,0,0.25)",
  };

  const ProgressSteps = () => (
    <div className="d-flex justify-content-center gap-4 my-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          onClick={() => setStep(n)}
          className="d-flex align-items-center justify-content-center"
          style={{
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            border: "3px solid white",
            color: step === n ? "#0059b3" : "white",
            background: step === n ? "white" : "transparent",
            fontWeight: "700",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {n}
        </div>
      ))}
    </div>
  );

  // --------------------------- RUN YOLO ---------------------------
  const runYOLO = async () => {
    if (!imageFile) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("greyImage", imageFile);
    formData.append("location", location);
    formData.append("capacity", capacity);
    formData.append("sunHours", sunHours);

    try {
      const response = await fetch(`${BACKEND_URL}/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setYoloResult(data);
      setStep(3);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend connection failed");
    }

    setLoading(false);
  };

  // --------------------------- STEP 1 ---------------------------
  const Step1 = () => (
    <div className="container text-white">
      <div className="mx-auto text-center" style={{ ...glassCard, maxWidth: "750px" }}>
        <h1 className="fw-bold mb-3" style={{ fontSize: "2.4rem" }}>
          ☀️ Solar Energy AI Predictor
        </h1>
          <p className="solar-info-text">
    Our Solar Energy AI Predictor uses advanced deep-learning models to
    analyze your solar panel image, detect faults such as dust, cracks, snow,
    shading, and bird drops, and accurately calculate the resulting energy loss.
  </p>
  
  <p className="solar-info-text">
    Simply upload an image and let the AI estimate performance, panel health,
    and efficiency loss—helping you maintain maximum solar output with ease.
  </p>
        <p className="lead mb-4">Upload an image & analyze faults + energy loss.</p>
        <button
          className="btn btn-light fw-bold px-5 py-2 rounded-pill shadow"
          onClick={() => setStep(2)}
        >
          Start →
        </button>
      </div>
    </div>
  );

  // --------------------------- STEP 2 ---------------------------

const Step2 = () => {

  // 📌 Right side video (local MP4)
  const RightSideContent = React.useMemo(() => (
    <div className="ratio ratio-16x9 rounded shadow-lg">
      <video controls style={{ width: "100%", borderRadius: "12px" }}>
        <source src="/Video/solar.mp4" type="Video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  ), []);  // creates once only

  // 📌 memoized file handler
  const handleFileChange = React.useCallback((e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setFileName(file ? file.name : "No file chosen");
  }, []);

  return (
    <div className="container text-white">
      <div className="mx-auto" style={{ ...glassCard, maxWidth: "980px" }}>
        
        <ProgressSteps />

        <h2 className="fw-bold text-center mb-4">✨ Solar Panel Energy Loss Input</h2>

        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-md-6">

            {/* LOCATION */}
            <div className="mb-3">
              <label className="fw-bold mb-1">📍 Where Installed?</label>
              <select
                className="form-select p-3 shadow-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ borderRadius: "14px" }}
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Factory">Factory</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Solar Plant">Solar Plant</option>
              </select>
            </div>

            {/* CAPACITY */}
            <div className="mb-3">
              <label className="fw-bold mb-1">⚡ Total System Capacity (kW)</label>
              <input
                type="number"
                className="form-control p-3 shadow-sm"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Enter 5, 10, 20..."
                style={{ borderRadius: "14px" }}
              />
            </div>

            {/* SUN HOURS */}
            <div className="mb-3">
              <label className="fw-bold mb-1">🌞 Sunlight Hours per Day</label>
              <input
                type="number"
                className="form-control p-3 shadow-sm"
                value={sunHours}
                onChange={(e) => setSunHours(e.target.value)}
                placeholder="Enter 5–8 hours"
                style={{ borderRadius: "14px" }}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div className="mb-3">
              <label className="fw-bold mb-2">🖼 Upload Image</label>

              <div
                className="d-flex align-items-center p-2 shadow-sm"
                style={{
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  position: "relative",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />

                <button className="btn btn-light btn-sm fw-bold me-2" style={{ borderRadius: "12px" }}>
                  Choose File
                </button>

                <span style={{ color: "#0e0b02f9" }}>{fileName}</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-light px-4" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button className="btn btn-light px-4 fw-bold" onClick={runYOLO}>
                {loading ? "Processing..." : "Analyze →"}
              </button>
            </div>

          </div>

          {/* RIGHT SIDE – Shows your local video */}
          <div className="col-md-6 mt-5">
            {RightSideContent}
          </div>

        </div>
      </div>
    </div>
  );
};




  // --------------------------- STEP 3 ---------------------------
const Step3 = () => {

  // Calculations
  const maxEnergy = capacity * sunHours;
  const totalLoss = yoloResult?.summary?.total_daily_loss_kwh || 0;
  const finalEnergy = maxEnergy - totalLoss;

  // PIE CHART DATA
  const pieData = [
    { name: "Usable Energy", value: finalEnergy },
    { name: "Energy Loss", value: totalLoss }
  ];

  const COLORS = ["#00d99b", "#ff5252"];

  return (
    <div className="container text-white">
      <div className="mx-auto" style={{ ...glassCard, maxWidth: "900px" }}>

        <ProgressSteps />

        <h2 className="text-center fw-bold mb-4">
          📊 Solar Panel Energy Loss Analysis
        </h2>

        {yoloResult && (
          <>
            {/* DETECTED IMAGE */}
            <img
              src={BACKEND_URL + yoloResult.download_url}
              className="img-fluid rounded shadow mb-4"
              style={{ border: "2px solid white" }}
              alt="Detection"
            />

            {/* SYSTEM SUMMARY PIE CHART */}
            <div
              className="p-4 rounded mb-4 text-center"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <h4 className="text-center mb-4">📘 System Summary</h4>

              <div
                style={{
                  position: "relative",
                  width: "350px",
                  height: "350px",
                  margin: "0 auto"
                }}
              >
                <PieChart width={350} height={350}>
                  <Pie
                    data={pieData}
                    innerRadius={100}
                    outerRadius={140}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>

                {/* Center text */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "white",
                    fontSize: "0.95rem",
                    lineHeight: "1.45rem",
                    fontWeight: "600",
                    pointerEvents: "none"
                  }}
                >
                  <div>Panels: {yoloResult.summary.total_panels}</div>
                  <div>Max: {maxEnergy} kWh</div>
                  <div>Loss: {totalLoss} kWh</div>
                  <div>Final: {finalEnergy.toFixed(2)} kWh</div>
                  <div>Perf: {yoloResult.summary.overall_loss_percentage}%</div>
                </div>
              </div>
            </div>

            {/* PANEL WISE ANALYSIS */}
            <h4 className="fw-bold mb-3">🟦 Panel-wise Breakdown</h4>

            {yoloResult?.panel_analysis?.map((panel, idx) => (
              <div key={idx} className="mb-5">

                {/* TWO CARDS SIDE BY SIDE */}
                <div className="row g-4 align-items-stretch">

                  {/* LEFT CARD */}
                  <div className="col-md-6 d-flex">
                    <div
                      className="p-3 rounded shadow flex-fill"
                      style={{ background: "rgba(255,255,255,0.18)" }}
                    >
                      <h5 className="fw-bold mb-3">🔧 Panel {panel.panel_number}</h5>

                      {panel.faults_left?.length > 0 ? (
                        panel.faults_left.map((fault, i) => (
                          <div
                            key={i}
                            className="p-3 mb-3 rounded"
                            style={{ background: "rgba(0,0,0,0.25)" }}
                          >
                            <p><b>Fault:</b> {fault.fault}</p>
                            <p><b>Confidence:</b> {(fault.confidence * 100).toFixed(1)}%</p>
                            <p><b>Affected:</b> {fault.affected_area}%</p>
                            <p><b>Loss %:</b> {fault.loss_percentage}%</p>
                            <p className="text-warning fw-bold">
                              🌞 Daily Loss: {fault.daily_loss} kWh
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="alert alert-success">✔ No visible faults</div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT CARD */}
                  <div className="col-md-6 d-flex">
                    <div
                      className="p-3 rounded shadow flex-fill"
                      style={{ background: "rgba(255,255,255,0.18)" }}
                    >
                      <h5 className="fw-bold mb-3">📌 Additional Info</h5>

                      {panel.faults_right?.length > 0 ? (
                        panel.faults_right.map((fault, i) => (
                          <div
                            key={i}
                            className="p-3 mb-3 rounded"
                            style={{ background: "rgba(0,0,0,0.25)" }}
                          >
                            <p><b>Fault:</b> {fault.fault}</p>
                            <p><b>Confidence:</b> {(fault.confidence * 100).toFixed(1)}%</p>
                            <p><b>Affected:</b> {fault.affected_area}%</p>
                            <p><b>Loss %:</b> {fault.loss_percentage}%</p>
                            <p className="text-warning fw-bold">
                              🌞 Daily Loss: {fault.daily_loss} kWh
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="alert alert-success">✔ No extra faults</div>
                      )}
                    </div>
                  </div>

                </div>

                {/* CENTERED PANEL LOSS BELOW BOTH CARDS */}
                <div className="text-center mt-3">
                  <div
                    className="p-3 rounded shadow d-inline-block"
                    style={{
                      background: "rgba(255,255,255,0.20)",
                      minWidth: "260px"
                    }}
                  >
                    <h4 className="fw-bold text-white mb-0">
                      ⚡ Panel Loss<br />{panel.panel_loss_kwh} kWh
                    </h4>
                  </div>
                </div>

              </div>
            ))}

            <div className="text-center mt-4">
              <a
                href={BACKEND_URL + yoloResult.download_url}
                className="btn btn-success px-4"
                download
              >
                Download Annotated Image
              </a>
            </div>
          </>
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-light px-4"
            onClick={() => setStep(2)}
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
};








  return <div style={pageStyle}>{step === 1 ? <Step1 /> : step === 2 ? <Step2 /> : <Step3 />}</div>;
};

export default DataScience;
