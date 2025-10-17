# Contributing to This Project 🎉

Thanks for your interest in contributing to this project! Contributions are what make the open-source community an amazing place to learn, inspire, and create.

---

## 💡 Getting Started

1. **Fork** the repository.  
2. **Clone** your fork locally:  
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   ```
3. **Create a new branch** for your feature or fix:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and **commit** them:  
   ```bash
   git commit -m "Add: brief description of your change"
   ```
5. **Push** your branch:  
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request (PR)** from your forked repo.

---

## 🧩 Contribution Guidelines

- Make sure your PR is **small and focused** on one issue or improvement.  
- Check if your code passes existing linting or formatting rules.  
- If you're fixing a bug or adding a feature, please include a **short description** in the PR.  
- Link any related **issue** using `Fixes #issue_number` in your PR description.  
- Only meaningful contributions will be accepted — typo fixes in non-code files (like README) won’t count toward Hacktoberfest unless they improve clarity or fix a real issue.

---

Here is the formatted section. You can paste this directly into your `CONTRIBUTING.md` file, for example, right after the "Getting Started" section.

-----

## 🛠️ Running the Project Locally

This project uses Firebase for backend services. To run it on your machine, you'll need to use your own Firebase keys.

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2.  In the project, create a new **Web App** (`</>`) to get your `firebaseConfig` keys.

3.  In your code editor, create a new file in the root folder named `.env.local`.

4.  Copy and paste your keys into the `.env.local` file like this:

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN_HERE
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID_HERE
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET_HERE
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID_HERE
    NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID_HERE
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID_HERE
    ```

5.  In the Firebase Console, go to "Build" and enable **Authentication** (using Email/Password) and **Storage**.

6.  Finally, install the packages and run the development server:

    ```bash
    npm install
    npm run dev
    ```
---

## 🏷️ Hacktoberfest Participation

This repository is participating in **Hacktoberfest 2025**! 🎃  

---

## 💬 Need Help?

Feel free to open a discussion or issue if you have questions before submitting your PR.

Happy Hacking! 🚀
