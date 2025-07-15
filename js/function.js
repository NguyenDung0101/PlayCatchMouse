 // Game State
      const gameState = {
        loggedIn: false,
        currentUser: null,
        cat: {
          name: 'Whiskers',
          hunger: 50,
          happiness: 70,
          energy: 60,
          mood: 'happy',
        },
        inventory: {
          food: 5,
          toy: 2,
        },
        coins: 100,
        activityLog: [
          'You fed Whiskers with Cat Food',
          'You played with Whiskers using Ball',
          'Whiskers went to sleep',
          'You petted Whiskers',
        ],
        gameHistory: [],
      };

      // Shop Items
      const shopItems = {
        food: {
          name: 'Cat Food',
          icon: 'fa-fish',
          price: 10,
          effect: { hunger: -20, happiness: 5 },
        },
        'premium-food': {
          name: 'Premium Food',
          icon: 'fa-drumstick-bite',
          price: 25,
          effect: { hunger: -30, happiness: 10 },
        },
        treat: {
          name: 'Cat Treat',
          icon: 'fa-cookie',
          price: 15,
          effect: { hunger: -10, happiness: 15 },
        },
        toy: {
          name: 'Ball',
          icon: 'fa-paw',
          price: 20,
          effect: { happiness: 20, energy: -15 },
        },
        laser: {
          name: 'Laser Pointer',
          icon: 'fa-lightbulb',
          price: 30,
          effect: { happiness: 30, energy: -20 },
        },
        scratch: {
          name: 'Scratch Post',
          icon: 'fa-cut',
          price: 40,
          effect: { happiness: 25, energy: -10 },
        },
        collar: {
          name: 'Fancy Collar',
          icon: 'fa-ring',
          price: 50,
          effect: { happiness: 15 },
        },
        hat: {
          name: 'Cat Hat',
          icon: 'fa-hat-cowboy',
          price: 35,
          effect: { happiness: 10 },
        },
        bed: {
          name: 'Comfy Bed',
          icon: 'fa-bed',
          price: 75,
          effect: { energy: 30 },
        },
      };

      // DOM Elements
      const authModal = document.getElementById('authModal');
      const authModalTitle = document.getElementById('authModalTitle');
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      const toggleAuthForm = document.getElementById('toggleAuthForm');
      const closeAuthModal = document.getElementById('closeAuthModal');
      const loginButton = document.getElementById('loginButton');
      const welcomeLoginButton = document.getElementById('welcomeLoginButton');
      const userSection = document.getElementById('userSection');
      const guestSection = document.getElementById('guestSection');
      const usernameDisplay = document.getElementById('usernameDisplay');
      const userCoins = document.getElementById('userCoins');
      const logoutButton = document.getElementById('logoutButton');
      const dashboard = document.getElementById('dashboard');
      const welcomeScreen = document.getElementById('welcomeScreen');
      const shop = document.getElementById('shop');
      const shopButton = document.getElementById('shopButton');
      const closeShop = document.getElementById('closeShop');
      const playGameButton = document.getElementById('playGameButton');
      const gameModal = document.getElementById('gameModal');
      const closeGameModal = document.getElementById('closeGameModal');
      const startGame = document.getElementById('startGame');
      const mouse = document.getElementById('mouse');
      const gameTime = document.getElementById('gameTime');
      const gameScore = document.getElementById('gameScore');

      // Cat elements
      const catName = document.getElementById('catName');
      const catStatus = document.getElementById('catStatus');
      const catImage = document.getElementById('catImage');
      const catMood = document.getElementById('catMood');
      const hungerBar = document.getElementById('hungerBar');
      const hungerValue = document.getElementById('hungerValue');
      const happinessBar = document.getElementById('happinessBar');
      const happinessValue = document.getElementById('happinessValue');
      const energyBar = document.getElementById('energyBar');
      const energyValue = document.getElementById('energyValue');
      const inventoryItems = document.getElementById('inventoryItems');
      const activityLog = document.getElementById('activityLog');

      // Game variables
      let gameInterval;
      let gameTimer;
      let score = 0;
      let timeLeft = 30;
      let gameActive = false;

      // Initialize the app
      function init() {
        updateUI();
        setupEventListeners();

        // Simulate cat stats degradation over time
        setInterval(() => {
          if (gameState.loggedIn) {
            // Gradually increase hunger and decrease happiness/energy
            gameState.cat.hunger = Math.min(100, gameState.cat.hunger + 1);
            gameState.cat.happiness = Math.max(
              0,
              gameState.cat.happiness - 0.5,
            );
            gameState.cat.energy = Math.max(0, gameState.cat.energy - 0.5);

            // Update mood based on stats
            updateCatMood();
            updateUI();
          }
        }, 10000); // Every 10 seconds
      }

      // Set up event listeners
      function setupEventListeners() {
        // Auth modal
        loginButton.addEventListener('click', () => showAuthModal('login'));
        welcomeLoginButton.addEventListener('click', () =>
          showAuthModal('login'),
        );
        closeAuthModal.addEventListener('click', hideAuthModal);
        toggleAuthForm.addEventListener('click', toggleAuthForms);

        // Login/register forms
        loginForm.addEventListener('submit', handleLogin);
        registerForm.addEventListener('submit', handleRegister);

        // User actions
        logoutButton.addEventListener('click', handleLogout);

        // Shop
        shopButton.addEventListener('click', showShop);
        closeShop.addEventListener('click', hideShop);

        // Cat actions
        document.querySelectorAll('.cat-action').forEach((button) => {
          button.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            handleCatAction(action);
          });
        });

        // Inventory items
        document.querySelectorAll('.inventory-item').forEach((item) => {
          item.addEventListener('click', function () {
            const itemType = this.getAttribute('data-item');
            useInventoryItem(itemType);
          });
        });

        // Game
        playGameButton.addEventListener('click', showGameModal);
        closeGameModal.addEventListener('click', hideGameModal);
        startGame.addEventListener('click', startMiniGame);
        mouse.addEventListener('click', catchMouse);
      }

      // Show auth modal
      function showAuthModal(formType) {
        authModal.classList.remove('hidden');
        if (formType === 'login') {
          loginForm.classList.remove('hidden');
          registerForm.classList.add('hidden');
          authModalTitle.textContent = 'Login';
          toggleAuthForm.textContent = "Don't have an account? Register here";
        } else {
          loginForm.classList.add('hidden');
          registerForm.classList.remove('hidden');
          authModalTitle.textContent = 'Register';
          toggleAuthForm.textContent = 'Already have an account? Login here';
        }
      }

      // Hide auth modal
      function hideAuthModal() {
        authModal.classList.add('hidden');
      }

      // Toggle between login and register forms
      function toggleAuthForms() {
        if (loginForm.classList.contains('hidden')) {
          loginForm.classList.remove('hidden');
          registerForm.classList.add('hidden');
          authModalTitle.textContent = 'Login';
          toggleAuthForm.textContent = "Don't have an account? Register here";
        } else {
          loginForm.classList.add('hidden');
          registerForm.classList.remove('hidden');
          authModalTitle.textContent = 'Register';
          toggleAuthForm.textContent = 'Already have an account? Login here';
        }
      }

      // Handle login
      function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Simple validation
        if (!username || !password) {
          alert('Please enter both username and password');
          return;
        }

        // Simulate login
        gameState.loggedIn = true;
        gameState.currentUser = username;
        hideAuthModal();
        updateUI();

        // Reset form
        loginForm.reset();
      }

      // Handle register
      function handleRegister(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById(
          'registerConfirmPassword',
        ).value;

        // Simple validation
        if (!username || !email || !password || !confirmPassword) {
          alert('Please fill in all fields');
          return;
        }

        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }

        // Simulate registration
        gameState.loggedIn = true;
        gameState.currentUser = username;
        hideAuthModal();
        updateUI();

        // Reset form
        registerForm.reset();
      }

      // Handle logout
      function handleLogout() {
        gameState.loggedIn = false;
        gameState.currentUser = null;
        updateUI();
      }

      // Update UI based on game state
      function updateUI() {
        if (gameState.loggedIn) {
          // Show user section and dashboard
          userSection.classList.remove('hidden');
          guestSection.classList.add('hidden');
          dashboard.classList.remove('hidden');
          welcomeScreen.classList.add('hidden');

          // Update user info
          usernameDisplay.textContent = gameState.currentUser;
          userCoins.textContent = gameState.coins;

          // Update cat info
          catName.textContent = gameState.cat.name;
          hungerBar.style.width = `${gameState.cat.hunger}%`;
          hungerValue.textContent = `${gameState.cat.hunger}%`;
          happinessBar.style.width = `${gameState.cat.happiness}%`;
          happinessValue.textContent = `${gameState.cat.happiness}%`;
          energyBar.style.width = `${gameState.cat.energy}%`;
          energyValue.textContent = `${gameState.cat.energy}%`;

          // Update cat mood
          updateCatMood();

          // Update inventory
          updateInventory();

          // Update activity log
          updateActivityLog();
        } else {
          // Show guest section and welcome screen
          userSection.classList.add('hidden');
          guestSection.classList.remove('hidden');
          dashboard.classList.add('hidden');
          welcomeScreen.classList.remove('hidden');
          shop.classList.add('hidden');
        }
      }

      // Update cat mood based on stats
      function updateCatMood() {
        const cat = gameState.cat;
        let mood, status, moodIcon;

        if (cat.hunger > 80) {
          mood = 'hungry';
          status = 'Very hungry and cranky!';
          moodIcon = 'fa-frown';
        } else if (cat.happiness < 30) {
          mood = 'sad';
          status = 'Feeling sad and lonely...';
          moodIcon = 'fa-sad-tear';
        } else if (cat.energy < 20) {
          mood = 'tired';
          status = 'Exhausted and needs rest';
          moodIcon = 'fa-tired';
        } else if (cat.happiness > 70 && cat.hunger < 30 && cat.energy > 50) {
          mood = 'happy';
          status = 'Happy and playful!';
          moodIcon = 'fa-smile-beam';
        } else {
          mood = 'content';
          status = 'Content and relaxed';
          moodIcon = 'fa-smile';
        }

        cat.mood = mood;
        catStatus.textContent = status;
        catMood.innerHTML = `<i class="fas ${moodIcon} text-white"></i>`;

        // Change cat image animation based on mood
        catImage.className = `w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden ${mood === 'happy' ? 'cat-bounce' : ''}`;
      }

      // Update inventory display
      function updateInventory() {
        inventoryItems.innerHTML = '';

        for (const [item, quantity] of Object.entries(gameState.inventory)) {
          if (quantity > 0) {
            const itemInfo = shopItems[item] || {
              name: item,
              icon: 'fa-question',
            };
            const itemElement = document.createElement('div');
            itemElement.className = `inventory-item bg-gray-100 p-3 rounded-md flex items-center space-x-2 cursor-pointer ${quantity > 0 ? 'hover:bg-gray-200' : 'opacity-50'}`;
            itemElement.setAttribute('data-item', item);
            itemElement.innerHTML = `
                        <i class="fas ${itemInfo.icon} text-blue-500"></i>
                        <span>${itemInfo.name} <span class="text-sm text-gray-500">(${quantity})</span></span>
                    `;
            itemElement.addEventListener('click', () => useInventoryItem(item));
            inventoryItems.appendChild(itemElement);
          }
        }
      }

      // Update activity log
      function updateActivityLog() {
        activityLog.innerHTML = '';

        gameState.activityLog.slice(0, 10).forEach((log) => {
          const logElement = document.createElement('div');
          logElement.className = 'text-sm p-2 bg-gray-50 rounded';
          logElement.textContent = log;
          activityLog.appendChild(logElement);
        });
      }

      // Handle cat actions (feed, play, pet, sleep)
      function handleCatAction(action) {
        let message = '';

        switch (action) {
          case 'feed':
            if (gameState.inventory.food > 0) {
              gameState.cat.hunger = Math.max(0, gameState.cat.hunger - 15);
              gameState.inventory.food--;
              message = `You fed ${gameState.cat.name} with Cat Food`;
            } else {
              message = `You don't have any food to feed ${gameState.cat.name}!`;
            }
            break;
          case 'play':
            if (gameState.inventory.toy > 0) {
              gameState.cat.happiness = Math.min(
                100,
                gameState.cat.happiness + 15,
              );
              gameState.cat.energy = Math.max(0, gameState.cat.energy - 10);
              gameState.inventory.toy--;
              message = `You played with ${gameState.cat.name} using Ball`;
            } else {
              message = `You don't have any toys to play with ${gameState.cat.name}!`;
            }
            break;
          case 'pet':
            gameState.cat.happiness = Math.min(
              100,
              gameState.cat.happiness + 5,
            );
            message = `You petted ${gameState.cat.name}`;
            break;
          case 'sleep':
            gameState.cat.energy = Math.min(100, gameState.cat.energy + 30);
            message = `${gameState.cat.name} took a nap`;
            break;
        }

        // Add to activity log
        const timestamp = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        gameState.activityLog.unshift(`[${timestamp}] ${message}`);

        // Update UI
        updateUI();
      }

      // Use inventory item
      function useInventoryItem(itemType) {
        if (gameState.inventory[itemType] > 0) {
          const item = shopItems[itemType];

          // Apply effects
          if (item.effect.hunger) {
            gameState.cat.hunger = Math.max(
              0,
              gameState.cat.hunger + item.effect.hunger,
            );
          }
          if (item.effect.happiness) {
            gameState.cat.happiness = Math.min(
              100,
              gameState.cat.happiness + item.effect.happiness,
            );
          }
          if (item.effect.energy) {
            gameState.cat.energy = Math.min(
              100,
              gameState.cat.energy + item.effect.energy,
            );
          }

          // Decrease quantity
          gameState.inventory[itemType]--;

          // Add to activity log
          const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          gameState.activityLog.unshift(
            `[${timestamp}] You used ${item.name} on ${gameState.cat.name}`,
          );

          // Update UI
          updateUI();
        }
      }

      // Show shop
      function showShop() {
        shop.classList.remove('hidden');
        dashboard.classList.add('hidden');

        // Set up shop item event listeners
        document.querySelectorAll('.buy-item').forEach((button) => {
          button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const itemElement = this.closest('.shop-item');
            const itemType = itemElement.getAttribute('data-item');
            const price = parseInt(itemElement.getAttribute('data-price'));

            buyItem(itemType, price);
          });
        });
      }

      // Hide shop
      function hideShop() {
        shop.classList.add('hidden');
        dashboard.classList.remove('hidden');
      }

      // Buy item from shop
      function buyItem(itemType, price) {
        if (gameState.coins >= price) {
          gameState.coins -= price;

          // Add to inventory
          if (!gameState.inventory[itemType]) {
            gameState.inventory[itemType] = 0;
          }
          gameState.inventory[itemType]++;

          // Add to activity log
          const itemName = shopItems[itemType].name;
          const timestamp = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          gameState.activityLog.unshift(
            `[${timestamp}] You bought ${itemName} for ${price} coins`,
          );

          // Update UI
          updateUI();

          // Show success message
          alert(`You bought ${itemName} for ${price} coins!`);
        } else {
          alert("You don't have enough coins!");
        }
      }

      // Show game modal
      function showGameModal() {
        gameModal.classList.remove('hidden');
      }

      // Hide game modal
      function hideGameModal() {
        gameModal.classList.add('hidden');
        resetGame();
      }

      // Start mini game
      function startMiniGame() {
        gameActive = true;
        score = 0;
        timeLeft = 30;

        gameScore.textContent = score;
        gameTime.textContent = timeLeft;

        startGame.textContent = 'Playing...';
        startGame.disabled = true;

        // Start timer
        gameTimer = setInterval(() => {
          timeLeft--;
          gameTime.textContent = timeLeft;

          if (timeLeft <= 0) {
            endGame();
          }
        }, 1000);

        // Move mouse randomly
        gameInterval = setInterval(moveMouse, 1000);

        // Initial mouse position
        moveMouse();
      }

      // Move mouse to random position
      function moveMouse() {
        if (!gameActive) return;

        const container = mouse.parentElement;
        const maxX = container.clientWidth - mouse.clientWidth;
        const maxY = container.clientHeight - mouse.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        mouse.style.left = `${randomX}px`;
        mouse.style.top = `${randomY}px`;
      }

      // Catch mouse (click handler)
      function catchMouse() {
        if (gameActive) {
          score++;
          gameScore.textContent = score;
          moveMouse();
        }
      }

      // End game
      function endGame() {
        gameActive = false;
        clearInterval(gameTimer);
        clearInterval(gameInterval);

        startGame.textContent = 'Play Again';
        startGame.disabled = false;

        // Calculate coins earned (1 coin per 2 points)
        const coinsEarned = Math.floor(score / 2);
        gameState.coins += coinsEarned;

        // Add to game history
        gameState.gameHistory.push({
          date: new Date(),
          score: score,
          coins: coinsEarned,
        });

        // Add to activity log
        const timestamp = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        gameState.activityLog.unshift(
          `[${timestamp}] You played Catch the Mouse and earned ${coinsEarned} coins (Score: ${score})`,
        );

        // Update UI
        updateUI();

        // Show result
        alert(
          `Game Over! You scored ${score} points and earned ${coinsEarned} coins!`,
        );
      }

      // Reset game state
      function resetGame() {
        gameActive = false;
        clearInterval(gameTimer);
        clearInterval(gameInterval);

        score = 0;
        timeLeft = 30;

        gameScore.textContent = score;
        gameTime.textContent = timeLeft;

        startGame.textContent = 'Start Game';
        startGame.disabled = false;
      }

      // Initialize the app
      init();