import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: 'secret_BtzGVFmPSDflYgMpNGK80pJz7ZlEEskdlSCa8IABlCc',
});

const databaseId = 'a9ec321b0c5b4019925ee5c784213ef7';

async function getUserByEmail(
  email: string,
): Promise<PageObjectResponse | null> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Email',
        title: {
          equals: email,
        },
      },
    });

    if (response.results.length > 0) {
      const result = response.results[0];
      if ((result as PageObjectResponse).properties) {
        return result as PageObjectResponse;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Database query failed');
  }
}

/** rich_text 배열을 포함하는지 확인하기 위한 타입 가드 함수 */
function hasRichTextProperty(obj: any): obj is { rich_text: any[] } {
  return obj && Array.isArray(obj.rich_text);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const userData = await getUserByEmail(email);

      if (!userData) {
        return res
          .status(404)
          .json({ message: '가입 정보가 없습니다. 회원가입을 진행해주세요.' });
      }

      // 핸들러 내부에서 쓰이는 각 요소에 대한 타입 검사
      if (!hasRichTextProperty(userData.properties.Password)) {
        return res
          .status(400)
          .json({ message: '올바른 비밀번호 데이터 형식이 아닙니다.' });
      }

      if (!hasRichTextProperty(userData.properties.Username)) {
        return res
          .status(400)
          .json({ message: '올바른 사용자명 데이터 형식이 아닙니다.' });
      }

      if (!hasRichTextProperty(userData.properties.Token)) {
        return res
          .status(400)
          .json({ message: '올바른 토큰 데이터 형식이 아닙니다.' });
      }

      const storedPassword =
        userData.properties.Password.rich_text[0].plain_text;

      if (password !== storedPassword) {
        return res.status(401).json({
          message: '입력한 비밀번호가 맞지 않습니다. 다시 입력해주세요.',
        });
      }

      const user = {
        email: email,
        username: userData.properties.Username.rich_text[0].plain_text,
        token: userData.properties.Token.rich_text[0].plain_text,
      };

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error.', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
