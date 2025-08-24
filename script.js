document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.getElementById('comment');
    const charCount = document.getElementById('charCount');
    const postBtn = document.getElementById('postBtn');
    const siteCheckboxes = document.querySelectorAll('#site-list input[type="checkbox"]');
    const thankYouMessage = document.getElementById('thankYouMessage');

    // --- Event Listeners ---

    commentInput.addEventListener('input', () => {
        charCount.textContent = commentInput.value.length;
    });

    // Ensure only one checkbox is checked at a time
    siteCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                siteCheckboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== event.target) {
                        otherCheckbox.checked = false;
                    }
                });
            }
            updateButtonState();
        });
    });

    // Update button state based on selected checkboxes
    function updateButtonState() {
        const selectedCount = Array.from(siteCheckboxes).filter(cb => cb.checked).length;
        if (selectedCount === 1) {
            postBtn.disabled = false;
            postBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            postBtn.textContent = 'Yorumunuzu kopyalayın ve seçtiğiniz siteyi açın';
        } else {
            postBtn.disabled = true;
            postBtn.classList.add('opacity-50', 'cursor-not-allowed');
            postBtn.textContent = 'Yorumunuzu kopyalayın ve seçtiğiniz siteyi açın';
        }
    }

    postBtn.addEventListener('click', () => {
        const comment = commentInput.value.trim();
        const selectedSite = Array.from(siteCheckboxes).find(cb => cb.checked);

        if (!comment) {
            alert('Lütfen önce yorumunuzu yazın!');
            return;
        }

        if (!selectedSite) {
            alert('Lütfen bir site seçin!');
            return;
        }

        navigator.clipboard.writeText(comment).then(() => {
            const url = selectedSite.dataset.url;
            if (url) {
                window.open(url, '_blank');
            }

            // Uncheck the selected checkbox to reset the state
            selectedSite.checked = false;
            updateButtonState();
            
            // Show the thank you message
            thankYouMessage.classList.remove('hidden');

            alert('Yorumunuz kopyalandı! 🙏\nAçılan siteye yapıştırabilirsiniz.');
        }).catch(err => {
            console.error('Kopyalama başarısız oldu: ', err);
            alert('Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın.');
        });
    });
    
    // --- Initial Load ---
    updateButtonState();
});