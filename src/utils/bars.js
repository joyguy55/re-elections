export function selectBar(electionData, barType) {
  return barType === "actual"
    ? function orderedVotes() {
        const valuesHillary = electionData.reduce((acc, obj) => {
          return acc.concat([
            {
              province: obj.province,
              electoral_vote: obj.hillary_actual,
              candidate: "hillary"
            }
          ]);
        }, []);
        let valuesTrump = electionData.reduce((acc, obj) => {
          return acc.concat([
            {
              province: obj.province,
              electoral_vote: obj.trump_actual,
              candidate: "trump"
            }
          ]);
        }, []);

        const filteredList = [...valuesHillary, ...valuesTrump].filter(obj => {
          if (obj.electoral_vote === 0) {
            return false;
          } else if (obj.province !== "Totals") {
            return true;
          }
          return false;
        });
        return filteredList;
      }
    : function orderedVotesHypethetical() {
        const hypetheticalValuesHillary = electionData.reduce((acc, obj) => {
          return acc.concat([
            {
              province: obj.province,
              electoral_vote: obj.hillary_hype,
              candidate: "hillary"
            }
          ]);
        }, []);
        let hypetheticalValuesTrump = electionData.reduce((acc, obj) => {
          return acc.concat([
            {
              province: obj.province,
              electoral_vote: obj.trump_hype,
              candidate: "trump"
            }
          ]);
        }, []);
        let hypetheticalValuesJohnson = electionData.reduce((acc, obj) => {
          return acc.concat([
            {
              province: obj.province,
              electoral_vote: obj.johnson_hype,
              candidate: "johnson"
            }
          ]);
        }, []);

        const filteredList = [
          ...hypetheticalValuesHillary,
          ...hypetheticalValuesTrump,
          ...hypetheticalValuesJohnson
        ].filter(obj => {
          if (obj.electoral_vote === 0) {
            return false;
          } else if (obj.province !== "Totals") {
            return true;
          }
          return false;
        });

        return filteredList;
      };
}
