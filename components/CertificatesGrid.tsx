import React from "react";
import CertificateCard from "./CertificateCard";
import { Certificate } from "../app/types";

interface CertificatesGridProps {
  certificates: Certificate[];
}

export default function CertificatesGrid({ certificates }: CertificatesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {certificates.map((cert, index) => (
        <CertificateCard
          key={cert.id}
          certificate={cert}
          index={index}
        />
      ))}
    </div>
  );
}
