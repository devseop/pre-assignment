import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import CryptoJS from 'crypto-js';
import { IUser } from 'src/types/types';

const notion = new Client({
  auth: 'secret_BtzGVFmPSDflYgMpNGK80pJz7ZlEEskdlSCa8IABlCc',
});

const databaseId = 'a9ec321b0c5b4019925ee5c784213ef7';

const createRichTextObject = (text: string) => ({
  rich_text: [{ text: { content: text } }],
});

async function registerUser(userData: IUser) {
  try {
    const token = CryptoJS.lib.WordArray.random(16).toString();

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Email: {
          title: [{ text: { content: userData.email as string } }],
        },
        Password: createRichTextObject(userData.password as string),
        Username: createRichTextObject(userData.username as string),
        Phone: createRichTextObject(userData.phone as string),
        BusinessNumber: createRichTextObject(userData.businessNumber as string),
        Token: createRichTextObject(token),
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding user to database:', error);
    return { success: false, error };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const userData = req.body;
      const result = await registerUser(userData);

      if (result.success) {
        res.status(200).json({
          message: '회원가입이 성공적으로 완료됐습니다.',
        });
      } else {
        res.status(500).json({ message: '회원가입에 실패했습니다.' });
      }
    } catch (error) {
      res.status(500).json({
        message: '서버에 에러가 생겼습니다. 고객센터에 문의해주세요.',
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
