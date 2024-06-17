// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  imageUrl: string;
};

type NextApiRequestWithBody = NextApiRequest & {
  body: {
    imageUrl: string;
    area: number;
    color: string;
  };
};

export default async function handler(
  req: NextApiRequestWithBody,
  res: NextApiResponse<Data>
) {
  const { imageUrl, area, color } = req.body;

  const { data } = await axios.post(
    `https://api.spacely.ai/api/v1/generate/color-transfer-exact`,
    {
      imageUrl,
      area,
      color,
    },
    {
      headers: {
        "X-API-KEY": process.env.SPACELY_API_KEY,
      },
    }
  );

  console.log(data);

  const MAX_TRIES = 100;
  let tries = 0;
  while (tries < MAX_TRIES) {
    const { data: data2 } = await axios.get(
      `https://api.spacely.ai/api/v1/generate/poll-result?refId=${data.data}`,
      {
        headers: {
          "X-API-KEY": process.env.SPACELY_API_KEY,
        },
      }
    );
    if (data2.data.status === "processing") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      tries += 1;
      continue;
    } else if (data2.data.status === "success") {
      return res.status(200).json({ imageUrl: data2.data.result[0] });
    }
    break;
  }

  res.status(500).json({ imageUrl: "" });
}
