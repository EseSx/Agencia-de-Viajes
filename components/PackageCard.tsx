import React from 'react';

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  features?: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({ title, description, price, features }) => {
  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-3xl font-bold mb-4">{price}</div>
      {features && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Select Package
      </button>
    </div>
  );
};

export default PackageCard;
