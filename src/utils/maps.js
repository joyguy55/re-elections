import { geoAlbersUsa } from "d3-composite-projections";
import { geoPath } from "d3-geo";
import { select } from "d3-selection";
import { transition } from "d3-transition";

export function selectMap(map) {
  switch (map) {
    case "createMapActualResult":
      return (usData, electionData, node, handleToolTip) => {
        const mergedData = usData.map(d => {
          const match = electionData.find(obj => {
            return d.id === obj.State_GeoJson_ID;
          });
          return { ...d, Trump_EV: match ? match.Trump_EV : null };
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
            return d.Trump_EV > 0 ? "#d74c32" : "#3c459f";
          })
          .on("click", handleToolTip.bind(this))
          .on("mouseover", function(d) {
            const color = d.Trump_EV > 0 ? "#F1664C" : "#565FB9";
            select(this).style("fill", color);
          })
          .on("mouseout", function(d) {
            const color = d.Trump_EV > 0 ? "#d74c32" : "#3c459f";
            select(this).style("fill", color);
          });
      };
    case "createMapHypetheticalResult":
      return (usData, electionData, node, handleToolTip) => {
        const mergedData = usData.map(d => {
          const match = electionData.find(obj => {
            return d.id === obj.State_GeoJson_ID;
          });
          return { ...d, Trump_EV: match ? match.Trump_EV : null };
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
          .style("fill", "url(#svgGradient)")
          .on("click", handleToolTip.bind(this))
          .on("mouseover", function(d) {
            select(this).style("fill", "url(#svgGradientLight)");
          })
          .on("mouseout", function(d) {
            select(this).style("fill", "url(#svgGradient)");
          });
      };
    default:
      return () => {};
  }
}
