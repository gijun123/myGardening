package com.ggirick.gardening_back.services.board;

import com.ggirick.gardening_back.dto.board.BoardFileDTO;
import com.ggirick.gardening_back.mappers.board.BoardFileMapper;
import com.ggirick.gardening_back.utils.FileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardFileService {
    private final BoardFileMapper boardFileMapper;
    private final FileUtil fileUtil;

    // 게시글 기준 파일 전체 조회
    public List<BoardFileDTO> getFileListByBoardId(int boardId) {
        return boardFileMapper.getFileListByBoardId(boardId);
    }

    // 개별 파일 조회
    public BoardFileDTO getFileById(int id) {
        return boardFileMapper.getFileById(id);
    }

    // 파일 등록
    @Transactional
    public void insert(List<MultipartFile> files, int boardId) throws Exception{
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String oriName = file.getOriginalFilename();
                String sysName = fileUtil.fileUpload(oriName, "board/" + boardId + "/", file);
                // public URL 생성
                String url = fileUtil.getPublicUrl(sysName);

                boardFileMapper.insert(
                        BoardFileDTO
                                .builder()
                                .oriName(oriName)
                                .sysName(sysName)
                                .url(url)
                                .boardId(boardId)
                                .build()
                );
            }
        }
    }

    // 파일 삭제
    public void deleteFile(BoardFileDTO dto) {

        // 1. DB 삭제
        boardFileMapper.deleteFile(dto.getId());

        // 2. GCP 삭제
        fileUtil.deleteFile(dto.getSysName());
    }

    // 게시글 삭제 시 전체 파일 삭제
    public void deleteFileByBoardId(int boardId) {

        List<BoardFileDTO> list = boardFileMapper.getFileListByBoardId(boardId);

        // GCP 삭제
        for (BoardFileDTO file : list) {
            fileUtil.deleteFile(file.getSysName());
        }

        // DB 삭제
        boardFileMapper.deleteFileByBoardId(boardId);
    }
}
