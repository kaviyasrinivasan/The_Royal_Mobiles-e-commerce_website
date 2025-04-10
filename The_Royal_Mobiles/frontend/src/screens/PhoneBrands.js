import React from "react";
import { Link } from "react-router-dom";
import samsungLogo from "./brands/samsung.avif";
import oppoLogo from "./brands/oppo.avif";
import realmeLogo from "./brands/realme.avif";
import appleLogo from "./brands/apple.avif";
import xiaomiLogo from "./brands/xiaomi.avif";
import oneplusLogo from "./brands/oneplus.avif";
import tecnoLogo from "./brands/tecno.avif";
import vivoLogo from "./brands/vivo.avif";
import "./PhoneBrands.css"; 

const brands = [
  { name: "Samsung", logo: samsungLogo, slug: "samsung", bgColor: "bg-gray-100" },
  { name: "Oppo", logo: oppoLogo, slug: "oppo", bgColor: "bg-green-100" },
  { name: "Realme", logo: realmeLogo, slug: "realme", bgColor: "bg-yellow-200" },
  { name: "Apple", logo: appleLogo, slug: "apple", bgColor: "bg-gray-200" },
  { name: "Xiaomi", logo: xiaomiLogo, slug: "xiaomi", bgColor: "bg-gray-100" },
  { name: "OnePlus", logo: oneplusLogo, slug: "oneplus", bgColor: "bg-gray-100" },
  { name: "Tecno", logo: tecnoLogo, slug: "tecno", bgColor: "bg-gray-100" },
  { name: "Vivo", logo: vivoLogo, slug: "vivo", bgColor: "bg-gray-100" }
];

const PhoneBrands = () => {
  return (
    <div className="phonebrands-container">
      <h2 className="phonebrands-title">Shop Phones by Brand</h2>
      <div className="brand-container">
        {brands.map((brand, index) => (
          <Link to={`/`} key={index} className="brand-item">
            <div className={`brand-circle ${brand.bgColor}`}>
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
            </div>
            <p className="brand-name">{brand.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhoneBrands;
