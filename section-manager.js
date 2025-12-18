// Section Manager - Gerenciador de Seções Dinâmico
(function() {
    'use strict';

    // Aguardar o DOM carregar completamente
    document.addEventListener('DOMContentLoaded', function() {
        
        // Identificar todas as seções principais da página
        function getAllSections() {
            const main = document.querySelector('main');
            if (!main) return [];
            
            return Array.from(main.querySelectorAll('.section')).map((element, index) => {
                // Identificar o nome da seção baseado no conteúdo
                let name = 'Seção ' + (index + 1);
                
                // Tentar identificar pelo título da seção
                const bgTitle = element.querySelector('.bg-title h6');
                if (bgTitle) {
                    name = bgTitle.textContent.trim();
                } else {
                    // Tentar identificar pelo H3 principal
                    const mainTitle = element.querySelector('h3');
                    if (mainTitle) {
                        name = mainTitle.textContent.trim();
                    } else {
                        // Identificar por características específicas
                        if (element.classList.contains('mt-5')) {
                            name = 'Banner Principal';
                        } else if (element.querySelector('.bg-banner') && element.querySelector('.number')) {
                            name = 'Painel de Indicadores';
                        } else if (element.querySelector('.swiper')) {
                            name = 'Transparência Ativa';
                        } else if (element.querySelector('.news-img')) {
                            name = 'Notícias';
                        } else if (element.querySelector('#tab-duration')) {
                            name = 'Agenda e Eventos';
                        } else if (element.querySelector('.rounded-4')) {
                            name = 'Cultura e Turismo';
                        } else if (element.querySelector('.card-testimonial')) {
                            name = 'Participação Popular';
                        } else if (element.querySelector('.card-team')) {
                            name = 'Dados Abertos';
                        } else if (element.querySelector('.accordion')) {
                            name = 'Perguntas Frequentes';
                        } else if (element.querySelector('.cta-img')) {
                            name = 'Newsletter';
                        } else if (element.querySelector('.marquee-container')) {
                            name = 'Órgãos Parceiros';
                        } else if (element.querySelector('.card-stat')) {
                            name = 'Acesso Rápido';
                        }
                    }
                }
                
                return {
                    id: 'section-' + index,
                    name: name,
                    element: element,
                    originalIndex: index
                };
            });
        }

        // Elementos do DOM
        const sectionManager = document.getElementById('section-manager');
        if (!sectionManager) return;

        let sections = getAllSections();

        // Renderizar o gerenciador de seções
        function renderSectionManager() {
            sectionManager.innerHTML = '';
            sections.forEach((section, index) => {
                if (!section.element) return;
                
                const item = document.createElement('div');
                item.className = 'd-flex align-items-center gap-2 mb-2 p-2 border rounded section-item';
                item.style.cursor = 'grab';
                item.draggable = true;
                item.dataset.sectionId = section.id;
                item.dataset.index = index;
                
                item.innerHTML = `
                    <i class="fas fa-grip-vertical text-muted" style="cursor: grab;"></i>
                    <div class="form-check form-switch mb-0 flex-grow-1">
                        <input class="form-check-input" type="checkbox" id="toggle-${section.id}" ${section.element.style.display !== 'none' ? 'checked' : ''}>
                        <label class="form-check-label small" for="toggle-${section.id}">${section.name}</label>
                    </div>
                    <i class="fas fa-arrows-alt-v text-muted"></i>
                `;
                
                // Toggle visibility
                const toggle = item.querySelector(`#toggle-${section.id}`);
                toggle.addEventListener('change', (e) => {
                    section.element.style.display = e.target.checked ? '' : 'none';
                    saveSectionState();
                });
                
                // Drag and drop
                item.addEventListener('dragstart', handleDragStart);
                item.addEventListener('dragover', handleDragOver);
                item.addEventListener('drop', handleDrop);
                item.addEventListener('dragend', handleDragEnd);
                
                sectionManager.appendChild(item);
            });
        }

        // Drag and drop handlers
        let draggedElement = null;

        function handleDragStart(e) {
            draggedElement = this;
            this.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.dataTransfer.dropEffect = 'move';
            return false;
        }

        function handleDrop(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            
            if (draggedElement !== this) {
                const draggedIndex = parseInt(draggedElement.dataset.index);
                const targetIndex = parseInt(this.dataset.index);
                
                // Reorder sections array
                const draggedSection = sections[draggedIndex];
                sections.splice(draggedIndex, 1);
                sections.splice(targetIndex, 0, draggedSection);
                
                // Reorder DOM elements
                const main = document.querySelector('main');
                const draggedDOM = draggedSection.element;
                const targetDOM = sections[targetIndex].element;
                
                // Insert the dragged element before the target
                main.insertBefore(draggedDOM, targetDOM);
                
                // Re-render the manager with updated indices
                renderSectionManager();
                saveSectionState();
            }
            
            return false;
        }

        function handleDragEnd(e) {
            this.style.opacity = '';
        }

        // Save state to localStorage
        function saveSectionState() {
            const state = sections.map(section => ({
                id: section.id,
                name: section.name,
                visible: section.element.style.display !== 'none',
                order: Array.from(document.querySelector('main').children).indexOf(section.element)
            }));
            localStorage.setItem('sectionState', JSON.stringify(state));
        }

        // Load state from localStorage
        function loadSectionState() {
            const saved = localStorage.getItem('sectionState');
            if (saved) {
                const state = JSON.parse(saved);
                
                // Apply visibility settings
                state.forEach(item => {
                    const section = sections.find(s => s.id === item.id);
                    if (section && section.element) {
                        section.element.style.display = item.visible ? '' : 'none';
                    }
                });
                
                // Reorder sections based on saved order
                const main = document.querySelector('main');
                const orderedSections = state
                    .sort((a, b) => a.order - b.order)
                    .map(item => sections.find(s => s.id === item.id))
                    .filter(Boolean);
                
                orderedSections.forEach(section => {
                    if (section && section.element) {
                        main.appendChild(section.element);
                    }
                });
                
                // Update sections array to reflect new order
                sections = getAllSections();
            }
        }

        // Reset sections to original order
        function resetSections() {
            sections.sort((a, b) => a.originalIndex - b.originalIndex);
            sections.forEach(section => {
                if (section.element) {
                    section.element.style.display = '';
                }
            });
            
            // Reorder DOM elements
            const main = document.querySelector('main');
            sections.forEach(section => {
                if (section.element) {
                    main.appendChild(section.element);
                }
            });
            
            localStorage.removeItem('sectionState');
            renderSectionManager();
        }

        // Initialize
        function init() {
            // Wait a bit for the page to fully load
            setTimeout(() => {
                sections = getAllSections();
                loadSectionState();
                renderSectionManager();
                
                // Add reset button functionality
                const resetBtn = document.getElementById('reset-sections');
                if (resetBtn) {
                    resetBtn.addEventListener('click', resetSections);
                }
            }, 1000);
        }

        // Initialize when DOM is ready
        init();
    });
})();