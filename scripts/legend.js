const svg = d3.select(`#legend`);

/****************** 노드 컬러 ******************/
svg.append('text')
  .text('Color of Keyword Nodes')
  .attrs({
    x: 100,
    y: 150,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

svg.append('text')
  .text('by Parts of Speech')
  .attrs({
    x: 100,
    y: 180,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

// 색상 범례 원 - 명사
svg.append('circle')
  .attrs({
    cx: 112,
    cy: 80,
    r: 10,
    fill: colormap.n,
  });

svg.append('text')
  .text('Noun')
  .attrs({
    x: 130,
    y: 80,
    'text-anchor': 'start',
    'alignment-baseline': 'middle',
    'font-size': '16px',
    'font-family': "Noto Sans KR",
    'font-weight': 100,
  });

// 색상 범례 원 - 동사
svg.append('circle')
  .attrs({
    cx: 112,
    cy: 115,
    r: 10,
    fill: colormap.v,
  });

svg.append('text')
  .text('Verb')
  .attrs({
    x: 130,
    y: 115,
    'text-anchor': 'start',
    'alignment-baseline': 'middle',
    'font-size': '16px',
    'font-family': "Noto Sans KR",
    'font-weight': 100,
  });

// 색상 범례 원 - 형용사
svg.append('circle')
  .attrs({
    cx: 215,
    cy: 80,
    r: 10,
    fill: colormap.a,
  });

svg.append('text')
  .text('Adjective')
  .attrs({
    x: 233,
    y: 80,
    'text-anchor': 'start',
    'alignment-baseline': 'middle',
    'font-size': '16px',
    'font-family': "Noto Sans KR",
    'font-weight': 100,
  });

// 색상 범례 원 - 기타
svg.append('circle')
  .attrs({
    cx: 215,
    cy: 115,
    r: 10,
    fill: colormap.x,
  });
svg.append('text')
  .text('Ect.')
  .attrs({
    x: 233,
    y: 115,
    'text-anchor': 'start',
    'alignment-baseline': 'middle',
    'font-size': '16px',
    'font-family': "Noto Sans KR",
    'font-weight': 100,
  });
/****************** 노드 컬러 ******************/

/****************** 노드 사이즈 ******************/
svg.append('text')
  .text('Size of Keyword Nodes')
  .attrs({
    x: 370,
    y: 150,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });
svg.append('text')
  .text('by Frequencies')
  .attrs({
    x: 370,
    y: 180,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });

for (let cnt = 5; cnt <= 15; cnt += 5) {
  const r = Math.sqrt(cnt) * 8;
  svg.append('circle')
    .attrs({
      cx: 445,
      cy: 130 - r,
      r: r,
      fill: 'none',
      stroke: '#555'
    });
  svg.append('line')
    .attrs({
      x1: 445,
      x2: 480,
      y1: 130 - 2 * r,
      y2: 130 - 2 * r,
      stroke: '#aaa'
    })
  svg.append('text').text(cnt).attrs({
    x: 505,
    y: 130 - 2 * r,
    'text-anchor': 'start',
    'alignment-baseline': 'middle',
    'font-size': '12px',
    'font-family': "Noto Sans KR",
    'font-weight': 100,
  })
}
/****************** 노드 사이즈 ******************/

/****************** 엣지 두께 ******************/
svg.append('text')
  .text('Thickness of Arcs')
  .attrs({
    x: 640,
    y: 150,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });
svg.append('text')
  .text('by Co-occurrences')
  .attrs({
    x: 640,
    y: 180,
    'text-anchor': 'start',
    'alignment-baseline': 'central',
    'font-size': '18px',
    'font-family': "Noto Sans KR",
    'font-weight': 300,
  });


for (let thickness = 0; thickness <= 30; thickness += 0.1) {
  svg.append('rect')
    .attrs({
      x: 640 + thickness * 5,
      y: 113 - thickness / 2,
      width: 0.3,
      height: thickness,
      fill: '#000',
    });
}

svg.append('text').text('min').attrs({
  x: 640,
  y: 70,
  'text-anchor': 'start',
  'alignment-baseline': 'middle',
  'font-size': '12px',
  'font-family': "Noto Sans KR",
  'font-weight': 100,
});
svg.append('text').text('max').attrs({
  x: 790,
  y: 70,
  'text-anchor': 'end',
  'alignment-baseline': 'middle',
  'font-size': '12px',
  'font-family': "Noto Sans KR",
  'font-weight': 100,
});
/****************** 엣지 두께 ******************/
