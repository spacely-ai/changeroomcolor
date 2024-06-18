# changeroomcolor.com

Welcome to **changeroomcolor.com**, an innovative open-source project that allows you to visualize different colors in your room with precision and speed using generative AI. Powered by Spacely AI, this project is built using Next.js and shadcn/ui.

## Features

- **Instant Room Color Changes**: Upload your room image and change wall, floor, or ceiling colors within seconds.
- **Powered by Spacely AI**: Leverage the power of Spacely AI for precise and realistic color changes.
- **User-Friendly Interface**: Intuitive and easy-to-use interface built with shadcn/ui.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js
- npm

### Installation

1. **Clone the Project**
    ```bash
    git clone https://github.com/spacely-ai/changeroomcolor.git
    cd changeroomcolor
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**
    - Copy the `.env.example` file to `.env.local`
    - Obtain the necessary API keys:
        - **Upload API Key**: Get your `NEXT_PUBLIC_UPLOAD_API_KEY` from [Bytescale](https://www.bytescale.com) for free usage with limited uploads.
        - **Spacely API Key**: Register at [Spacely AI](https://enterprise.spacely.ai/) to receive 10 free credits and get your `SPACELY_API_KEY`.
    - Update the `.env.local` file with the obtained API keys.
    ```bash
    cp .env.example .env.local
    ```

4. **Start the Project**
    ```bash
    npm run dev
    ```

Now, you're ready to explore and use the changeroomcolor.com app on your local machine!

## Built With

- **Next.js**: The React framework for production.
- **shadcn/ui**: A component library for building modern UIs.
- **Spacely AI**: The AI engine behind the precise room color changes.

## Contributing

We welcome contributions from the community! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Contact

For any inquiries or support, please contact us at: [jetnipat@spacely.ai](mailto:jetnipat@spacely.ai)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Built by [Spacely.ai](https://www.spacely.ai/)

Enjoy changing your room colors effortlessly with **changeroomcolor.com**!
