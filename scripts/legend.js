const svg = d3.select(`#legend`);

/** 컬러 인코딩  **/
svg.append('text')
  .text('Color of Keyword Nodes')
  .attrs({
    x: 350,
    y: 150,
    'text-anchor': 'middle',
    'alignment-baseline': 'central',
    'font-size': '21px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });
svg.append('text')
  .text('by Parts of Speech')
  .attrs({
    x: 350,
    y: 180,
    'text-anchor': 'middle',
    'alignment-baseline': 'central',
    'font-size': '21px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

svg.append('rect')
  .attrs({
    x: 250,
    y: 60,
    width: 25,
    height: 25,
    fill: colormap.n,
  });

svg.append('text')
  .text('Noun')
  .attrs({
    x: 280,
    y: 60,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

svg.append('rect')
  .attrs({
    x: 250,
    y: 100,
    width: 25,
    height: 25,
    fill: colormap.v,
  });

svg.append('text')
  .text('Verb')
  .attrs({
    x: 280,
    y: 100,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

svg.append('rect')
  .attrs({
    x: 380,
    y: 60,
    width: 25,
    height: 25,
    fill: colormap.a,
  });

svg.append('text')
  .text('Verb')
  .attrs({
    x: 410,
    y: 60,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

svg.append('rect')
  .attrs({
    x: 380,
    y: 100,
    width: 25,
    height: 25,
    fill: colormap.x,
  });

svg.append('text')
  .text('Verb')
  .attrs({
    x: 410,
    y: 100,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

/** 노드 사이즈  **/
svg.append('text')
  .text('Size of Keyword Nodes')
  .attrs({
    x: 650,
    y: 150,
    'text-anchor': 'middle',
    'alignment-baseline': 'central',
    'font-size': '21px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });
svg.append('text')
  .text('by Frequencies')
  .attrs({
    x: 650,
    y: 180,
    'text-anchor': 'middle',
    'alignment-baseline': 'central',
    'font-size': '21px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

for (let cnt = 5; cnt <= 20; cnt += 5) {
  const r = Math.sqrt(cnt) * 8;
  svg.append('circle')
    .attrs({
      cx: 650,
      cy: 120 - r,
      r: r,
      fill: 'none',
      stroke: '#555'
    });
  svg.append('line')
    .attrs({
      x1: 650,
      x2: 700,
      y1: 120 - 2 * r,
      y2: 120 - 2 * r,
      stroke: '#aaa'
    })
  svg.append('text').text(cnt).attrs({
    x: 700,
    y: 120 - 2 * r - 5,
    'text-anchor': 'start',
    'alignment-baseline': 'middle',
    'font-size': '12px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  })
}

/** 엣지 사이즈  **/
svg.append('text')
  .text('Thickness of Arcs')
  .attrs({
    x: 950,
    y: 150,
    'text-anchor': 'middle',
    'alignment-baseline': 'central',
    'font-size': '21px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });
svg.append('text')
  .text('by Co-occurrences')
  .attrs({
    x: 950,
    y: 180,
    'text-anchor': 'middle',
    'alignment-baseline': 'central',
    'font-size': '21px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });


for (let thickness = 0; thickness <= 30; thickness += 0.1) {
  svg.append('rect')
    .attrs({
      x: 870 + thickness * 5,
      y: 100 - thickness / 2,
      width: 0.3,
      height: thickness,
      fill: '#000',
    });
}

svg.append('text').text('min').attrs({
  x: 870,
  y: 60,
  'text-anchor': 'middle',
  'alignment-baseline': 'middle',
  'font-size': '12px',
  'font-family': "Noto Sans KR",
  'font-weight': 300,
});
svg.append('text').text('max').attrs({
  x: 1020,
  y: 60,
  'text-anchor': 'middle',
  'alignment-baseline': 'middle',
  'font-size': '12px',
  'font-family': "Noto Sans KR",
  'font-weight': 300,
});
