package com.a508.studyservice.service;

import com.a508.studyservice.dto.response.ProblemResponse;
import com.a508.studyservice.entity.ChoiceSolved;
import com.a508.studyservice.entity.TodayLearning;
import com.a508.studyservice.entity.Voca;
import com.a508.studyservice.global.common.code.ErrorCode;
import com.a508.studyservice.global.common.exception.BaseException;
import com.a508.studyservice.repository.ChoiceRepository;
import com.a508.studyservice.repository.TodayLearningRepository;
import com.a508.studyservice.repository.VocaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class VocaServiceImpl implements  VocaService {

    private final TodayLearningRepository todayLearningRepository;
    private final VocaRepository vocaRepository;
    private final ChoiceRepository choiceRepository;



    @Override
    public List<ProblemResponse> getVocaProblem(String token, LocalDateTime date) {
        int userId = 1;
        /*
        token을 활용한 userFeign 후 로직 처리 추가 되어야함.
         */
        LocalDateTime startDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MIN); // 오늘의 시작
        LocalDateTime endDate = LocalDateTime.of(date.toLocalDate(), LocalTime.MAX); // 오늘의 끝
        String type = "어휘";

        List<TodayLearning> todayLearnings = todayLearningRepository.findByUserIdAndCreateAtBetweenAndType(userId,startDate,endDate,type);
        log.info(todayLearnings.toString());
        List<Voca> vocaList = new ArrayList<>();
        List<ProblemResponse> problemResponses = new ArrayList<>();

        for( TodayLearning todayLearning : todayLearnings){
            vocaList.add(vocaRepository.findById(todayLearning.getProblemId()).orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST_ERROR)) );
        }
        log.info(vocaList.toString());

        for(Voca voca : vocaList){
            ChoiceSolved choiceSolved = choiceRepository.findByUserIdAndTypeAndProblemId(userId,type,voca.getId());
            ProblemResponse response = vocaToDto(voca);
            if( choiceSolved != null ) {
                response.setAnswer(choiceSolved.getAnswer());
                response.setUserAnswer(choiceSolved.getUserAnswer());
                response.setCorrect(choiceSolved.isCorrect());
                response.setCreatedAt(choiceSolved.getCreatedAt());
            }

            problemResponses.add(response);
        }

        return problemResponses;
    }


    public ProblemResponse  vocaToDto(Voca voca){
        ProblemResponse problemResponse = new ProblemResponse();
        problemResponse.setTitle("다음 단어나 문장과 관련된 단어를 고르세요!");
        problemResponse.setQuestion(voca.getContent());
        problemResponse.setOption1(voca.getOption1());
        problemResponse.setOption2(voca.getOption2());
        problemResponse.setOption3(voca.getOption3());
        problemResponse.setProblemId(voca.getId());
        problemResponse.setType("어휘");

        return problemResponse;
    }
}
