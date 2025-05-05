<script>
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.cv-form');
    const cvOutput = document.getElementById('cv-output');
    const addEducationBtn = document.getElementById('add-education');
    const addExperienceBtn = document.getElementById('add-experience');
    const addSkillBtn = document.getElementById('add-skill');
    const generatePdfBtn = document.getElementById('generate-pdf');

    // --- Function to update CV preview ---
    function updatePreview() {
        const formData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            summary: document.getElementById('summary').value,
            education: [],
            experience: [],
            skills: []
        };

        // Collect Education Data
        document.querySelectorAll('#education-entries .education-entry').forEach(entry => {
            formData.education.push({
                degree: entry.querySelector('.degree').value,
                major: entry.querySelector('.major').value,
                institution: entry.querySelector('.institution').value,
                years: entry.querySelector('.edu-years').value
            });
        });

        // Collect Experience Data
        document.querySelectorAll('#experience-entries .experience-entry').forEach(entry => {
             formData.experience.push({
                 title: entry.querySelector('.job-title').value,
                 company: entry.querySelector('.company').value,
                 years: entry.querySelector('.exp-years').value,
                 responsibilities: entry.querySelector('.responsibilities').value
             });
        });

        // Collect Skills Data
        document.querySelectorAll('#skills-entries .skill-entry').forEach(entry => {
             formData.skills.push({
                 name: entry.querySelector('.skill-name').value
             });
        });


        // --- Generate HTML for Preview ---
        let cvHtml = '';

        // Personal Info
        if (formData.name || formData.title || formData.email || formData.phone || formData.location || formData.linkedin || formData.github) {
            cvHtml += `<h2>${formData.name || 'Nama Lengkap'}</h2>`;
            if (formData.title) cvHtml += `<p><strong>${formData.title}</strong></p>`;
            cvHtml += '<p>';
            if (formData.email) cvHtml += `<i class="fas fa-envelope"></i> ${formData.email} &bull; `;
            if (formData.phone) cvHtml += `<i class="fas fa-phone"></i> ${formData.phone} &bull; `;
            if (formData.location) cvHtml += `<i class="fas fa-map-marker-alt"></i> ${formData.location}`;
            cvHtml += '</p>';
             cvHtml += '<p>'; // Pisahkan link sosmed
             if (formData.linkedin) cvHtml += `<i class="fab fa-linkedin"></i> <a href="${formData.linkedin}" target="_blank">${formData.linkedin}</a> &bull; `;
             if (formData.github) cvHtml += `<i class="fab fa-github"></i> <a href="${formData.github}" target="_blank">${formData.github}</a>`;
             cvHtml += '</p>';

        }
         if (formData.summary) {
             cvHtml += `<h3>Ringkasan Profil</h3><p>${formData.summary}</p>`;
         }


        // Education
        if (formData.education.length > 0 && (formData.education[0].degree || formData.education[0].major || formData.education[0].institution || formData.education[0].years)) {
            cvHtml += '<h3>Pendidikan</h3><ul>';
            formData.education.forEach(edu => {
                if (edu.degree || edu.major || edu.institution || edu.years) {
                    cvHtml += `<li><strong>${edu.degree || ''} ${edu.major || ''}</strong>, ${edu.institution || ''} (${edu.years || ''})</li>`;
                }
            });
            cvHtml += '</ul>';
        }

        // Experience
        if (formData.experience.length > 0 && (formData.experience[0].title || formData.experience[0].company || formData.experience[0].years || formData.experience[0].responsibilities)) {
             cvHtml += '<h3>Pengalaman Kerja</h3><ul>';
             formData.experience.forEach(exp => {
                  if (exp.title || exp.company || exp.years || exp.responsibilities) {
                       cvHtml += `<li><strong>${exp.title || ''}</strong> di ${exp.company || ''} (${exp.years || ''})`;
                       if (exp.responsibilities) {
                            // Split responsibilities by newline and create list items
                            const responsibilitiesList = exp.responsibilities.split('\n').map(item => `<li>${item.trim()}</li>`).join('');
                            if (responsibilitiesList) {
                                 cvHtml += `<ul>${responsibilitiesList}</ul>`;
                            }
                       }
                       cvHtml += '</li>';
                  }
             });
             cvHtml += '</ul>';
        }

        // Skills
        if (formData.skills.length > 0 && formData.skills[0].name) {
             cvHtml += '<h3>Keahlian</h3><ul>';
             formData.skills.forEach(skill => {
                  if (skill.name) {
                       cvHtml += `<li>${skill.name}</li>`;
                  }
             });
             cvHtml += '</ul>';
        }


        // Update the preview div
        cvOutput.innerHTML = cvHtml || '<p>Isi formulir di samping untuk melihat pratinjau CV.</p>';
    }

    // --- Function to add new entry fields ---
    function addEntry(containerId, entryClass, labelsAndClasses) {
        const container = document.getElementById(containerId);
        const currentIndex = container.querySelectorAll(`.${entryClass}`).length;
        const newEntry = document.createElement('div');
        newEntry.classList.add(entryClass);

        let entryHtml = '';
        labelsAndClasses.forEach(({ label, className, type = 'text', tag = 'input', rows = 1 }) => {
             const id = `${className}-${currentIndex}`;
             entryHtml += `<label for="${id}">${label}:</label>`;
             if (tag === 'input') {
                  entryHtml += `<input type="${type}" class="${className}" id="${id}" data-index="${currentIndex}">`;
             } else if (tag === 'textarea') {
                  entryHtml += `<textarea class="${className}" id="${id}" data-index="${currentIndex}" rows="${rows}"></textarea>`;
             }
        });

        entryHtml += '<button type="button" class="remove-entry">Hapus</button>';

        newEntry.innerHTML = entryHtml;
        container.appendChild(newEntry);

        // Add event listener to the new remove button
        newEntry.querySelector('.remove-entry').addEventListener('click', () => {
            container.removeChild(newEntry);
            updatePreview(); // Update preview after removing
        });

         // Add event listeners to new inputs for real-time preview
         newEntry.querySelectorAll('input, textarea').forEach(input => {
             input.addEventListener('input', updatePreview);
         });
    }

    // --- Event Listeners ---

    // Real-time preview update on any form input change
    form.addEventListener('input', updatePreview);

    // Add Education Entry
    addEducationBtn.addEventListener('click', () => {
        addEntry('education-entries', 'education-entry', [
            { label: 'Gelar/Jenjang', className: 'degree' },
            { label: 'Jurusan', className: 'major' },
            { label: 'Institusi', className: 'institution' },
            { label: 'Tahun', className: 'edu-years' }
        ]);
    });

    // Add Experience Entry
    addExperienceBtn.addEventListener('click', () => {
         addEntry('experience-entries', 'experience-entry', [
              { label: 'Posisi', className: 'job-title' },
              { label: 'Perusahaan', className: 'company' },
              { label: 'Tahun', className: 'exp-years' },
              { label: 'Tanggung Jawab/Deskripsi', className: 'responsibilities', tag: 'textarea', rows: 3 }
         ]);
    });

     // Add Skill Entry
     addSkillBtn.addEventListener('click', () => {
          addEntry('skills-entries', 'skill-entry', [
               { label: 'Nama Skill', className: 'skill-name' }
          ]);
     });


    // Handle initial remove buttons (for the default entry)
    document.querySelectorAll('.remove-entry').forEach(button => {
        button.addEventListener('click', (event) => {
            // Find the closest parent entry div and remove it
            const entry = event.target.closest('.education-entry, .experience-entry, .skill-entry');
            if (entry) {
                entry.parentElement.removeChild(entry);
                updatePreview(); // Update preview after removing
            }
        });
    });

    // Generate PDF Button
    generatePdfBtn.addEventListener('click', () => {
        const element = document.getElementById('cv-output'); // Element yang akan diubah jadi PDF

        // html2pdf options (bisa disesuaikan)
        const options = {
            margin: [10, 10, 10, 10], // top, left, bottom, right in mm
            filename: 'CV_DedeKurniawan.pdf', // Nama file PDF
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Use html2pdf library
        html2pdf().from(element).set(options).save();
    });


    // Initial preview update on page load
    updatePreview();
});
</script>
</body>
</html>