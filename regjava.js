// === Convert YES/NO checkbox pairs to RADIO buttons ===
(function () {

    function convertYesNoGroups() {

        document.querySelectorAll('.check-row').forEach(group => {

            const inputs = Array.from(group.querySelectorAll('input[type="checkbox"]'));

            // Only touch groups with exactly 2 options
            if (inputs.length !== 2) return;

            const labels = inputs.map(input => {
                const label = document.querySelector(`label[for="${input.id}"]`);
                return label ? label.textContent.trim().toLowerCase() : "";
            });

            // Only convert if labels are Yes/No
            const isYesNo =
                labels.some(t => t.startsWith("yes")) &&
                labels.some(t => t.startsWith("no"));

            if (!isYesNo) return;

            const groupName = inputs[0].name || ("question-" + group.id);

            inputs.forEach(input => {
                input.type = "radio";      // Change checkbox → radio
                input.name = groupName;    // Ensure same group name
            });

            group.setAttribute("role", "radiogroup");
        });
    }

    // Run once
    convertYesNoGroups();

    // Re-run if Angular redraws the form
    const observer = new MutationObserver(() => convertYesNoGroups());
    observer.observe(document.body, { childList: true, subtree: true });

})();