document.addEventListener('DOMContentLoaded', function() {
    const columns = document.querySelectorAll('.card-body');
    
    columns.forEach(column => {
        new Sortable(column, {
            group: 'processes',
            animation: 150,
            ghostClass: 'process-ghost',
            dragClass: 'process-drag'
        });
    });

    // Function to update deadline colors
    function updateDeadlineColors() {
        const deadlines = document.querySelectorAll('.badge');
        const today = new Date();
        
        deadlines.forEach(deadline => {
            const date = new Date(deadline.textContent.trim());
            const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) {
                deadline.classList.remove('bg-success', 'bg-warning');
                deadline.classList.add('bg-danger');
            } else if (diffDays <= 15) {
                deadline.classList.remove('bg-success', 'bg-danger');
                deadline.classList.add('bg-warning');
            } else {
                deadline.classList.remove('bg-danger', 'bg-warning');
                deadline.classList.add('bg-success');
            }
        });
    }

    updateDeadlineColors();
});
