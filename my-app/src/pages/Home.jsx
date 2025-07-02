import { useEffect, useState } from "react";
import API from "../services/api";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("http://localhost:5000/api/properties");
      setProperties(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {properties.map((p) => (
          <div key={p._id} className="col-12 col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={p.image || "https://via.placeholder.com/300x200"}
                className="card-img-top"
                alt={p.title}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-muted">{p.location}</p>
                <p className="card-text fw-bold">₹{p.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
