class FMCApproachPage {
    static ShowPage1(fmc) {
        fmc.clearDisplay();
        let units = fmc.useLbs;
        let landingWeightCell = "";
        let flaps20Cell = "";
        let flaps25Cell = "";
        let flaps30Cell = "";
        let flaps20VRefCell = "";
        let flaps25VRefCell = "";
        let flaps30VRefCell = "";
        let landingWeight = fmc.getWeight(units);
        if (isFinite(landingWeight)) {
            landingWeightCell = landingWeight.toFixed(1);
            flaps20Cell = "20°";
            flaps25Cell = "25°";
            flaps30Cell = "30°";
            let flaps20Speed = Math.round(SimVar.GetSimVarValue("L:SALTY_VREF20", "knots"));
            if (isFinite(flaps20Speed)) {
                flaps20VRefCell = flaps20Speed.toFixed(0) + "KT";
                fmc.onRightInput[0] = () => {
                    fmc.inOut = "20/" + flaps20Speed.toFixed(0);
                };
            }
            let flaps25Speed = Math.round(SimVar.GetSimVarValue("L:SALTY_VREF25", "knots"));
            if (isFinite(flaps25Speed)) {
                flaps25VRefCell = flaps25Speed.toFixed(0) + "KT";
                fmc.onRightInput[1] = () => {
                    fmc.inOut = "25/" + flaps25Speed.toFixed(0);
                };
            }
            let flaps30Speed = Math.round(SimVar.GetSimVarValue("L:SALTY_VREF30", "knots"));
            if (isFinite(flaps30Speed)) {
                flaps30VRefCell = flaps30Speed.toFixed(0) + "KT";
                fmc.onRightInput[2] = () => {
                    fmc.inOut = "30/" + flaps30Speed.toFixed(0);
                };
            }
        }
        let finalCell = "-----";
        let runwayLengthCell = "---";
        let approach = fmc.flightPlanManager.getApproach();
        if (approach && approach.name) {
            finalCell = Avionics.Utils.formatRunway(approach.name);
            let approachRunway = fmc.flightPlanManager.getApproachRunway();
            if (approachRunway) {
                runwayLengthCell = approachRunway.length.toFixed(0) + "M";
            }
        }
        let selectedFlapSpeedCell = "";
        if (isFinite(fmc.selectedApproachFlap)) {
            selectedFlapSpeedCell = fmc.selectedApproachFlap.toFixed(0) + "°";
        }
        else {
            selectedFlapSpeedCell = "---";
        }
        selectedFlapSpeedCell += "/ ";
        if (isFinite(fmc.selectedApproachSpeed)) {
            selectedFlapSpeedCell += fmc.selectedApproachSpeed.toFixed(0) + "KT";
        }
        else {
            selectedFlapSpeedCell += "---";
        }
        fmc.onRightInput[3] = () => {
            let value = fmc.inOut;
            fmc.clearUserInput();
            if (fmc.setSelectedApproachFlapSpeed(value)) {
                FMCApproachPage.ShowPage1(fmc);
            }
        };
        fmc.setTemplate([
            ["APPROACH REF"],
            ["GROSS WT", "VREF", "FLAPS"],
            [landingWeightCell, flaps20VRefCell, flaps20Cell],
            [""],
            ["", flaps25VRefCell, flaps25Cell],
            ["QNH LANDING"],
            ["", flaps30VRefCell, flaps30Cell],
            [finalCell, "FLAP/SPD"],
            [runwayLengthCell, selectedFlapSpeedCell],
            [""],
            [""],
            ["__FMCSEPARATOR"],
            ["\<INDEX", "THRUST LIM>"]
        ]);
        fmc.onLeftInput[5] = () => { B747_8_FMC_InitRefIndexPage.ShowPage1(fmc); };
        fmc.onRightInput[5] = () => { FMCThrustLimPage.ShowPage1(fmc); };
    }
}
//# sourceMappingURL=B747_8_FMC_ApproachPage.js.map