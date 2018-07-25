import { geoAlbersUsa } from "d3-composite-projections";
import { geoPath } from "d3-geo";
import { select } from "d3-selection";
import { $democratic_color, $republican_color } from "../styles/vars.js";

export function selectMap(map) {
  switch (map) {
    case "createMapActualResult":
      return (usData, electionData, node, handleToolTip) => {
        const mergedData = usData.map(d => {
          const match = electionData.find(obj => {
            return d.id === obj.state_geo_json_id;
          });

          return {
            ...d,
            trump_actual: match ? match.trump_actual : null,
            label: match ? match.Province : null
          };
        });
        const projection = geoAlbersUsa().scale(850);
        const path = geoPath().projection(projection);

        select(node)
          .selectAll("path")
          .remove();

        select(node)
          .selectAll("path")
          .data(mergedData)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "state")
          .attr("id", function(d) {
            return d.state;
          })
          .style("stroke", "#fff")
          .style("stroke-width", "1")
          .style("fill", function(d) {
            return d.trump_actual > 0 ? $republican_color : $democratic_color;
          })
          .style("fill-opacity", function(d) {
            if (map === "createMapHypetheticalResult") {
              return d.trump_actual > 0
                ? parseFloat(d.trump_perc) + 0.3
                : 1 - d.trump_perc + 0.3;
            }
            return;
          })
          .on("click", function(d) {
            handleToolTip(d);
          })
          .on("mouseover", function() {
            this.parentElement.appendChild(this);
            select(this)
              .style("stroke", "black")
              .style("Stroke-width", "1.7");
          })
          .on("mouseout", function(d) {
            select(this)
              .style("stroke", "white")
              .style("Stroke-width", "1");
          });
      };
    case "createMapHypetheticalResult":
      return (usData, electionData, node, handleToolTip) => {
        const mergedData = usData.map(d => {
          const match = electionData.find(obj => {
            return d.id === obj.state_geo_json_id;
          });
          return {
            ...d,
            trump_actual: match ? match.trump_actual : null,
            trump_perc: match ? match.trump_perc : null
          };
        });
        const projection = geoAlbersUsa().scale(850);
        const path = geoPath().projection(projection);

        select(node)
          .selectAll("path")
          .remove();

        select(node)
          .selectAll("path")
          .data(mergedData)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("class", "state")
          .style("stroke", "#fff")
          .style("stroke-width", "1")
          .style("fill", function(d) {
            return d.trump_actual > 0 ? $republican_color : $democratic_color;
          })
          .style("fill-opacity", function(d) {
            return d.trump_actual > 0
              ? parseFloat(d.trump_perc) + 0.3
              : 1 - d.trump_perc + 0.3;
          })
          .on("click", function(d) {
            handleToolTip(d);
          })
          .on("mouseover", function() {
            this.parentElement.appendChild(this);
            select(this)
              .style("stroke", "black")
              .style("Stroke-width", "1.7");
          })
          .on("mouseout", function(d) {
            select(this)
              .style("stroke", "white")
              .style("Stroke-width", "1");
          });
      };
    default:
      return () => {};
  }
}
