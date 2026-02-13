document.addEventListener("DOMContentLoaded", () => {

  const vehicles = ["GPG-830", "JLN-678", "LMO-637"];
  const history = [];

  const $ = (id) => document.getElementById(id);

  // Täytä auto dropdown
  const vehicleSelect = $("fVehicle");
  vehicles.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v;
    vehicleSelect.appendChild(opt);
  });

  // Aseta nykyinen päivä ja aika
  const now = new Date();
  $("fDate").value = now.toISOString().slice(0,10);
  $("fTime").value = now.toTimeString().slice(0,5);

  function calculate() {
    const driven = parseFloat($("fDriven").value);
    const liters = parseFloat($("fLiters").value);
    const adblue = parseFloat($("fAdblue").value);

    if (!isNaN(driven) && driven > 0 && !isNaN(liters)) {
      const avg = (liters / driven) * 100;
      $("fAvgCalc").value = avg.toFixed(1);
    } else {
      $("fAvgCalc").value = "";
    }

    if (!isNaN(driven) && driven > 0 && !isNaN(adblue)) {
      const adAvg = (adblue / driven) * 1000;
      $("fAdblueAvg").value = adAvg.toFixed(2);
    } else {
      $("fAdblueAvg").value = "";
    }
  }

  $("fDriven").addEventListener("input", calculate);
  $("fLiters").addEventListener("input", calculate);
  $("fAdblue").addEventListener("input", calculate);

  $("btnClear").addEventListener("click", () => {
    document.querySelectorAll("input").forEach(i => {
      if (!i.disabled) i.value = "";
    });
    calculate();
  });

  $("btnSave").addEventListener("click", () => {

    const entry = {
      date: $("fDate").value,
      time: $("fTime").value,
      place: $("fPlace").value,
      vehicle: $("fVehicle").value,
      odo: $("fOdo").value,
      driven: $("fDriven").value,
      liters: $("fLiters").value,
      avg: $("fAvgCalc").value,
      avgCar: $("fAvgCar").value,
      adblue: $("fAdblue").value,
      adAvg: $("fAdblueAvg").value
    };

    history.push(entry);
    renderHistory();
    alert("Tallennettu (demo-versio ilman Sheets-tallennusta)");
  });

  function renderHistory() {
    const list = $("list");
    list.innerHTML = "";

    history.forEach(e => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <strong>${e.date} ${e.time}</strong><br>
        ${e.vehicle} • ${e.place}<br>
        Mittari: ${e.odo} km<br>
        Ajettu: ${e.driven} km<br>
        Tankattu: ${e.liters} l<br>
        Kulutus: ${e.avg} l/100<br>
        AdBlue: ${e.adblue || 0} l (${e.adAvg || 0} l/1000km)
      `;
      list.appendChild(div);
    });
  }

});
