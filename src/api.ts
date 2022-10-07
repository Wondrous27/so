import google from "googlethis";
import axios from "axios";

export type SearchItemType = {
  label: string;
  value: string;
};

export const getGoogleResults = async (searchTerm: string) => {
  const options = {
    page: 0,
    safe: false,
    additional_params: {
      hl: "en",
      as_sitesearch: "stackoverflow.com",
    },
  };

  const { results } = await google.search(searchTerm, options);

  const items: SearchItemType[] = results!.map((result) => {
    // extract question id
    const questionId = result.url.match(/\/(\d+)\//)![1];
    // remove the trailing - Stack Overflow from result
    const title = result.title.match(/.*(?=-)/gm)?.[0] ?? result.title;
    return { label: title!, value: questionId! };
  });

  return items;
};

export const getSOAnswers = async (id: string) => {
  const url = `https://api.stackexchange.com/2.3/questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!.FdFmE8tMxn_JQyxAGvrq_3R_3mNz`;
  const { data } = await axios.get<Response>(url);
  console.log(data.items);
  return data.items;
};

export interface Answer {
  is_accepted: boolean;
  score: number;
  title: string;
  body_markdown: string;
  link: URL;
  creation_date: number;
  owner: {
    profile_image: URL;
    accept_rate: number;
    display_name: string;
  };
}

interface Response {
  items: Answer[];
}
