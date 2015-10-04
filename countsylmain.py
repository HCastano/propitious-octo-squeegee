#!/usr/bin/python2.7

from nltk.corpus import cmudict
import sys

d = cmudict.dict()
def nsyl(word):
  return [len(list(y for y in x if y[-1].isdigit())) for x in d[word.lower()]] 

if __name__ == '__main__':
	for word in sys.argv[1:]:
		print(nsyl(word))
