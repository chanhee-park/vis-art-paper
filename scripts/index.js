main();

function main () {
  for (let i = 0; i < 5; i++) {
    const script = text[i];
    const usableWords = getUsableWordList(script);
    const ranked = getCharRank(usableWords);
    const nodes = getNodes(ranked);
    const links = getLinks(nodes, usableWords);
    const svg = d3.select(`#section-${i + 1}`);
    drawLinks(svg, links, nodes);
    drawNodes(svg, nodes);

    /* !!!! 다운로드 !!!! */
    // svg.append('circle').attrs({
    //   cx: 1730,
    //   cy: 230,
    //   r: 0.1,
    //   c: '#fff',
    //   opacity: 0
    // });

    // const svgObj = document.getElementById(`section-${i + 1}`);
    // download(`art-${i + 1}.svg`, svgObj.outerHTML);
    // console.log(svgObj);
  }
}

function drawNodes (svg, nodes) {
  const W = 1700;
  const H = 400;
  _.forEach(nodes, node => {
    const color = colormap[pos[node.value]];
    const x = (node.position + 1) * W / 21;
    const y = H - 180;
    svg.append('circle').attrs({
      cx: x,
      cy: y,
      r: Math.sqrt(node.size) * 8,
      fill: color,
    });
    // https://bl.ocks.org/emmasaunders/0016ee0a2cab25a643ee9bd4855d3464
    svg.append('text').text(node.value).attrs({
      'text-anchor': 'end',
      'alignment-baseline': 'alphabetic',
      'font-size': '21px',
      'font-family': "Noto Sans KR",
      'font-weight': 400,
      "transform": `translate(${x},${y + 42.5}) rotate(315)`,
    });
  })
}

function drawLinks (svg, links, nodes) {
  const nodeArr = _.values(nodes);
  const linkArr = _.values(links);
  const sorted = _.sortBy(linkArr, (e) => -e.value);
  const sliced = sorted.slice(0, 30);
  const W = 1700;
  const H = 400;

  const lineFunction = d3.line()
    .x(function (d) { return d.x; })
    .y(function (d) { return d.y; })
    .curve(d3.curveBasis); // curveLinear

  for (let link of sliced) {
    const from = nodes[link.from];
    const to = nodes[link.to];
    const fromPosition = (from.position + 1) * W / 21;
    const toPostion = (to.position + 1) * W / 21;
    const midPostion = (fromPosition + toPostion) / 2;

    const nodeY = H - 180;
    const nodeDistance = nodeArr.indexOf(to) - nodeArr.indexOf(from);
    const LineMaxY = 200 * (1 - (nodeDistance / 19));

    const lineData = [
      { x: fromPosition, y: nodeY },
      { x: midPostion - 20 * nodeDistance, y: LineMaxY },
      { x: midPostion + 20 * nodeDistance, y: LineMaxY },
      { x: toPostion, y: nodeY }
    ];

    let stWidth = (link.value) * (link.value);
    stWidth = stWidth > 30 ? 30 : stWidth;
    stWidth = stWidth < 3 ? 3 : stWidth;

    const id = `svgGradient-${linkCnt}`;

    var gradient = svg.append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("x2", "100%")
      .attr("y1", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr('class', 'start')
      .attr("offset", "0%")
      .attr("stop-color", colormap[pos[link.from]])
      .attr("stop-opacity", 1);

    gradient.append("stop")
      .attr('class', 'end')
      .attr("offset", "100%")
      .attr("stop-color", colormap[pos[link.to]])
      .attr("stop-opacity", 1);

    svg.append("path")
      .attr("d", lineFunction(lineData))
      .attr("stroke", `url(#${id})`)
      .attr("stroke-width", stWidth)
      .attr("fill", "none")
      .attr("opacity", 0.5);

    linkCnt++;
  }
}

function getNodes (ranked) {
  const ret = {};
  _.forEach(ranked, (e, idx) => {
    ret[e[0]] = {
      position: idx,
      size: e[1],
      value: e[0]
    }
  });
  return ret;
}

function getLinks (nodes, words) {
  const nodeArr = _.values(nodes);
  const len = nodeArr.length;
  const links = {};
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      const from = nodeArr[i].value;
      const fromIdxs = getAllIndexes(words, from);
      const to = nodeArr[j].value;
      const toIdxs = getAllIndexes(words, to);
      let value = 0;
      for (let fId of fromIdxs) {
        for (let tId of toIdxs) {
          const distance = Math.abs(fId - tId);
          if (distance < 20) {
            value += (1 / distance);
          }
        }
      }
      links[`${from} - ${to}`] = {
        from: from,
        to: to,
        value: value
      }
    }
  }
  return links;
}

function getUsableWordList (string) {
  const usableWords = [];
  const words = string.split(' ');
  for (let w of words) {
    w = makeUsable(w);
    if (stopwords.indexOf(w) === -1) usableWords.push(w);
  }
  return usableWords;
}

function getCharRank (words) {
  const counter = {};
  for (let w of words) {
    if (!counter.hasOwnProperty(w)) {
      counter[w] = 1;
    } else {
      counter[w] += 1;
    }
  }
  const arr = [];
  _.forEach(counter, (value, key) => {
    arr.push([key, value]);
  })
  const top20 = _.sortBy(arr, [function (o) { return -o[1]; }]).slice(0, 20);
  const ret = [];
  _.forEach(arr, (e) => {
    if (top20.indexOf(e) >= 0) {
      ret.push(e);
    }
  });
  return ret;
}

function makeUsable (word) {
  return word.toLowerCase()
    .replace(/\./g, "")
    .replace(/,/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/“/g, "")
    .replace(/’/g, "")
    .replace(/1/g, "")
    .replace(/2/g, "")
    .replace(/3/g, "")
    .replace(/4/g, "")
    .replace(/5/g, "")
    .replace(/6/g, "")
    .replace(/7/g, "")
    .replace(/8/g, "")
    .replace(/9/g, "")
    .replace(/0/g, "")
    .replace(/\[/g, "")
    .replace(/\]/g, "")
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/-/g, "")
    ;
}

function getAllIndexes (arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

function download (filename, text) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
  }
  else {
    pom.click();
  }
}