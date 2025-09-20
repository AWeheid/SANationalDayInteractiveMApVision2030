import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import countryMapData from "../lib/SaudiMap.json";
import * as echarts from "echarts";
import { ScriptModal } from "./VideoModal";
import { projectsData, type Project } from "../lib/projectData";

export const CountryProgressMap = () => {
  const [isMapRegistered, setIsMapRegistered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Cast to any to satisfy ECharts typing; the imported JSON is a valid GeoJSON FeatureCollection
    echarts.registerMap("Saudi Arabia", countryMapData as any); // Replace "COUNTRY" with the name of your country
    setIsMapRegistered(true);
  }, []);

  // Disabled region clicks - only circles are clickable now

  const handleProjectClick = (params: any) => {
    const projectId = params.data.projectId;
    const project = projectsData.find(p => p.id === projectId);
    
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const chartOptions = {
    geo: {
      map: "Saudi Arabia",
      roam: true,
      itemStyle: {
        areaColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "var(--secondary-teal)",
        borderWidth: 1,
        shadowColor: "rgba(27, 75, 71, 0.3)",
        shadowBlur: 1,
      },
      emphasis: {
        itemStyle: {
          areaColor: "var(--primary-green)",
          borderColor: "var(--secondary-teal)",
          borderWidth: 2,
          shadowColor: "rgba(0, 166, 81, 0.6)",
          shadowBlur: 1,
        },
        label: {
          show: false,
          color: "#008346",
          fontWeight: "bold",
          fontSize: 14,
          fontFamily: "Saudi, IBM Plex Sans Arabic, Arial, sans-serif",
          textShadowColor: "rgba(0, 0, 0, 0.5)",
          textShadowBlur: 2,
        },
      },
    },
    series: [
      {
        type: "scatter",
        coordinateSystem: "geo",
        data: projectsData.map(project => ({
          name: project.name,
          value: project.coordinates,
          projectId: project.id,
          itemStyle: {
            color: "#971A4D",
            borderColor: "#ffffff",
            borderWidth: 3,
            shadowColor: "rgba(151, 26, 77, 0.6)",
            shadowBlur: 10,
          },
          symbolSize: 20,
          symbol: "circle",
        })),
        emphasis: {
          itemStyle: {
            color: "#B8275A",
            borderColor: "#ffffff",
            borderWidth: 4,
            shadowColor: "rgba(184, 39, 90, 0.8)",
            shadowBlur: 15,
          },
          symbolSize: 25,
        },
      },
    ],
    tooltip: {
      show: true,
      trigger: "item",
      formatter: (params: any) => {
        if (params.componentType === "geo") {
          return params.name; // Just show region name, no click instruction
        } else {
          return `${params.data.name}<br/>اضغط لعرض تفاصيل المشروع`;
        }
      },
      backgroundColor: "rgba(27, 75, 71, 0.95)",
      borderColor: "var(--secondary-teal)",
      borderWidth: 2,
      textStyle: {
        color: "#ffffff",
        fontFamily: "Saudi, IBM Plex Sans Arabic, Arial, sans-serif",
        fontSize: 16,
      },
      padding: [10, 15],
      borderRadius: 8,
    },
    legend: {
      show: false,
    },
  };

  if (!isMapRegistered) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
          fontSize: "1.5rem",
          fontFamily: "Saudi, IBM Plex Sans Arabic, Arial, sans-serif",
          direction: "rtl",
        }}
      >
        جاري تحميل الخريطة...
      </div>
    );
  }

  return (
    <>
      <ReactECharts
        option={chartOptions}
        onEvents={{
          click: (params: any) => {
            // Only handle clicks on circles (series), not regions (geo)
            if (params.componentType === "series") {
              handleProjectClick(params);
            }
          },
        }}
        opts={{
          renderer: 'canvas',
        }}
        style={{ 
          height: "100%", 
          width: "100%",
          touchAction: "pan-x pan-y"
        }}
      />
      <ScriptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        regionName={selectedProject?.name || ""}
        script={selectedProject?.description || ""}
        objectives={selectedProject?.objectives || []}
        subProjects={selectedProject?.subProjects || []}
      />
    </>
  );
};
