// JS-Khanoi-Towers (3 poles, 2 - 8 Disks)
// Recursion

// ?????????????????
function legitPole(arr, index, weight) {
    let w = weight;
    let res = index;
    while ( res === index && w <= Disks) {
      res = whichPole(arr, w);
      w++;
    }
    return res;
  }
  
  // Find index of the tower (pole) which holds Disc with requested "weight" 
  function whichPole(arr, weight) {
    let index = -1;
    arr.forEach((pole, i) => {
      if (pole.includes(weight))
        index = i;
    });
    return(index);
  }
  
  // Determine where to move active Disk
  function whereTo(arr, weight) {
    const res = [];
    const position = whichPole(arr, weight); // find position of active Disk
    console.log('inside WhereTo', position, weight)
    console.log(arr);
    if (weight === Math.min(...arr[position])) // if disk is at the top of the pole
      arr.forEach((pole, i) => {
        if (pole.length > 0) { // if there are other disks at the pole (tower)
          if (weight < pole[pole.length-1]) // if active Disk weight is less than the top disk at the tower weight 
            res.push(i); // add pole index to RES
        } else { // pole.length === 0;
          res.push(i); // or if there are no disks at the tower (pole)
        }
      });
    if (res.length > 1) // if there are more than one option of active Disk move
      res[0] = { // 0 -> 1; 2 -> 1; 1 -> ?????
        0: 1,
        1: legitPole(arr, position, weight+1),
        2: 1
      }[position]
    // console.log(weight, [position], 'whereTo', res)
    return res[0]; // only best option to move
  }

  const log = console.log;
  
  function logic(arr) {
    log('Function Logic Call')
    let q = 1; // smallest weight
    while (arr[arr.length-1].length < Disks) { // if all Disks are at last tower?
      console.log(q);
      const poleFrom = whichPole(arr, q);
      const poleTo = whereTo(arr, q);
      log('q =', q, poleFrom, poleTo);
      if (poleTo >= 0)
        moveOne(arr, poleFrom, poleTo);
      q = (q === Disks) ? 1 : q + 1;
    }
  }
  
  function moveOne(arr, iFrom, iTo) {
    arr[iTo].push(arr[iFrom].pop());
    console.log('moveOne',++counter, arr);
    return [iFrom, iTo];
  }
  
  function moveStack(arr, weight, iFrom, iTo) {
    const iMid = 3 - iFrom - iTo;
    if (weight < 3) {
      moveOne(arr, iFrom, iMid);
      moveOne(arr, iFrom, iTo);
      moveOne(arr, iMid, iTo);
    } else {
      moveStack(arr, weight-1, iFrom, iMid);
      moveOne(arr, iFrom, iTo);
      moveStack(arr, weight-1, iMid, iTo);
    }
  }

  // Recursion algorithm to Move whole Tower, if Tower is normalized (i.e. 3-2-1).
  function moveTower(arr, weight, tSrc, tTgt) {
    let res = []; 
    let t = [];
    if (weight > 0) {
      const tAux = 3 - tSrc - tTgt;
      t = moveTower(arr, weight-1, tSrc, tAux);
      res.push(...t);
      t = moveOne(arr, tSrc, tTgt);
      res.push(t);
      t = moveTower(arr, weight-1, tAux, tTgt);
      res.push(...t);
    }
    console.log(counter, res);
    return res;
  }

  // -------------------------------------
  let towers = [[],[],[]];
  let Disks = 3;
  let counter = 0;
  for (let i=Disks; i>0; i--) towers[0].push(i);
  
  // Move 1 0 -> 1
  // Move 2 0 -> 2
  // Move 1 1 -> 2
  
  // Move 1,2 0 -> 2
  
  // Move 3   0 -> 1
  // Move 1,2 2 -> 0
  // Move 3   1 -> 2
  // Move 1,2 0 -> 2
  
  // Move 4   0 -> 1
  // Move 1,2,3 2 -> 0
  // Move 4   1 -> 2
  // Move 1,2,3 0 -> 2
  
  console.log("initial", towers)
  
  // moveStack(towers, Disks, 0, 2);
  let instructions = moveTower(towers, Disks, 0, 2);
  console.log('final instr', instructions)

  // towers = [ [4, 1], [ 3, 2 ], [ ] ];
  // Disks = Math.max(...towers.map(t => Math.max(...t)));
  console.log(towers);
  // logic(towers);

  // moveStack(towers, Disks, 2, 1);
  // console.log("initial", towers)
  // console.log();
  