
am5.ready(function() {

    // Create root element
    var root = am5.Root.new("chartdiv");
    
    // Set themes
    root.setThemes([
       am5themes_Animated.new(root)
    ]);
    
    // Create chart
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
      startAngle: 180,
      endAngle: 360,
      layout: root.verticalLayout,
      innerRadius: am5.percent(50)
    }));
    
    
    // Create Series
    var series = chart.series.push(am5percent.PieSeries.new(root, {
      startAngle: 180,
      endAngle: 360,
      valueField: "value",
      categoryField: "category",
      alignLabels: false
    }));
    
    series.get("colors").set("colors", [
        am5.color(0x7900FF),
        am5.color(0x548CFF),
        am5.color(0x93FFD8),
        am5.color(0xCFFFDC),
    ]);
    
    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180
    });
    
    series.slices.template.setAll({
      cornerRadius: 5
    });
    
    series.ticks.template.setAll({
      forceHidden: true
    });

    series.labels.template.setAll({
      text: ""
    });
    
    // Set data
    series.data.setAll([
      { value: 10, category: "Plastic" },
      { value: 9, category: "Metal" },
      { value: 6, category: "Paper" },
      { value: 5, category: "Glass" },
    ]);
    
    series.appear(1000, 100);
    
    }); 