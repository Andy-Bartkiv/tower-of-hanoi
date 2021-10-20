// Returns set of instructions to move whole Tower (normalized, i.e. 4-3-2-1)
// with max Disk "weight", from Source Tower to Target Tower
function calcTowerMove(weight, tSrc, tTgt) {
    let res = []; 
    if (weight > 0) {
      const tAux = 3 - tSrc - tTgt;
      res.push(...calcTowerMove(weight-1, tSrc, tAux));
      res.push([tSrc, tTgt]);
      res.push(...calcTowerMove(weight-1, tAux, tTgt));
    }
    return res;
};

// Returns set of instructions to build Tower of Disks (from random Disks position) at Target Tower
export default function calcTowerBuild(initTowers, tTgt) {
		let res = [];
		// deep copy of Towers array
		const newTowers = JSON.parse(JSON.stringify(initTowers));
		// Values for Max and Min weight of Disks in new Towers array
		const maxW = Math.max(...newTowers.map(t => Math.max(...t)));
		const minW = Math.min(...newTowers.map(t => Math.min(...t)));
		// determine Source (where maxW Disk is located) and Auxillary Towers
		const tSrc = newTowers.findIndex(t => t.includes(maxW)); 
		const tAux = 3 - tSrc - tTgt;
		// Combine Recursive Tower building and Tower moving algorithms
		if (tSrc >= 0) {
			newTowers[tSrc].shift();
			if (tSrc === tTgt) { // if heaviest Disk in new Array is at Target Tower already
				res.push(...calcTowerBuild(newTowers, tTgt))
			} else { // if it is not 
				res.push(...calcTowerBuild(newTowers, tAux));
				res.push([tSrc, tTgt]);
				res.push(...calcTowerMove(maxW - minW, tAux, tTgt));	
			}
		}
  return res;
};